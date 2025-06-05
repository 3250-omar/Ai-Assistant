import LoadingSpinner from "./LoadingSpinner";
import { CgArrowRight } from "react-icons/cg";

interface SendingPromptProps {
  loading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
}

const SendingPrompt = ({
  loading,
  handleSubmit,
  newMessage,
  setNewMessage,
}: SendingPromptProps) => {
  return (
    <form
      className="w-full chat-padding bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 fixed bottom-0 z-50 flex items-center gap-5 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="Programming question ?"
        className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        required
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage || ""}
      />
      <button
        className=" bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700  text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200 gap-2 font-medium"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {" "}
            <span>Send</span> <CgArrowRight />
          </>
        )}
      </button>
    </form>
  );
};

export default SendingPrompt;
