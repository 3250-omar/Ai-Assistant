import { LuBotMessageSquare } from "react-icons/lu";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { initializeModel } from "../config/gemini";
import NavigateBtn from "../Components/SubComponents/NavigateBtn";
import SendingPrompt from "../Components/SubComponents/SendingPrompt";
import MemoizedMessages from "../Components/SubComponents/MemorizeMessages";

interface messagesProps {
  id: string | number;
  text?: string;
  userId?: string;
  role?: "user" | "ai";
  isWelcomeMessage?: boolean;
  replyTo?: string;
  time?: any; // Adjust type as needed
}

const Chat = () => {
  const [messages, setMessages] = useState<messagesProps[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [down, setDown] = useState<boolean>(true);
  const [user] = useAuthState(auth);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
    if (!user) return;

    const initilizeChat = async () => {
      const messagesRef = collection(db, "messages");
      const userMessageQuery = query(
        messagesRef,
        where("userId", "==", user.uid)
      );
      // Check if welcome message already exists
      const snapShot = await getDocs(userMessageQuery);
      if (snapShot.empty) {
        await addDoc(messagesRef, {
          role: "ai",
          userId: user.uid,
          isWelcomeMessage: true,
          time: serverTimestamp(),
          text: `Hello there! I'm here to help you with your programming questions. Feel free to ask me anything related to programming, and I'll do my best to assist you.
Here are some examples of questions you can ask:
- How to write a loop in Python
- What is the difference between a list and a tuple in Python
- How to use regular expressions in JavaScript

I can also help you with more specific questions, such as:

- How to solve the FizzBuzz problem in Java
- How to implement a binary search tree in C++
- How to use a neural network to classify images in Python

I'm particularly good at:
- Explaining complex programming concepts
- Debugging code issues
- Providing code examples with explanations
- Suggesting best practices and design patterns

Just let me know what you're working on, and I'll do my best to help!`,
        });
      }
    };
    initilizeChat();

    const q = query(
      collection(db, "messages"),
      where("userId", "==", user.uid),
      orderBy("time", "asc"),
      limit(50)
    );

    const unSubscribe = onSnapshot(q, {
      next: (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Only update if changed
        setMessages((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(messagesData))
            return prev;
          return messagesData;
        });
      },
      error: (error) => {
        console.log(error.message);
      },
    });
    return () => unSubscribe();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1500);
    e.preventDefault();
    if (!newMessage.trim() || loading) {
      return;
    }
    setLoading(true);
    try {
      const userMessageDoc = await addDoc(collection(db, "messages"), {
        text: newMessage,
        time: serverTimestamp(),
        role: "user",
        userId: user?.uid,
      });
      const currentModel = initializeModel();
      if (!currentModel) {
        throw new Error("Api Not Found ...");
      }
      const results = await currentModel.generateContent(
        `you are a helpful programming assistant. please provide me a well-formatted responses with code examples when appropriate . UserQuestion:${newMessage} `
      );

      const response = results.response.text();
      await addDoc(collection(db, "messages"), {
        text: response,
        time: serverTimestamp(),
        role: "ai",
        userId: user?.uid,
        replyTo: userMessageDoc.id,
      });
    } catch (error: any) {
      console.log(error.message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Error" + error.message,
          userId: user?.uid,
        },
      ]);
    } finally {
      setNewMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col  min-h-screen relative">
      <header
        className="w-full chat-padding bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50   flex"
        id="top-chat"
      >
        <div className=" flex gap-3 justify-center items-center">
          <LuBotMessageSquare className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center p-2" />
          <div className="flex flex-col justify-start">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              AI Chat Assistant
            </h1>
            <p className="text-gray-400">Your coding companion</p>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6 mb-20">
          <MemoizedMessages messages={messages} />
          <div ref={endOfMessagesRef} id="end-of-messages"></div>
        </div>

        {/* sending prompt */}

        <SendingPrompt
          loading={loading}
          handleSubmit={handleSubmit}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </div>
      <NavigateBtn down={down} setDown={setDown} />
    </div>
  );
};

export default Chat;
