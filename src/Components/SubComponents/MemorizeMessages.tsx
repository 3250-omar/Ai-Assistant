import React from "react";
import { MessageContent } from "./MessageContent";

interface MessageProps {
  id: string | number;
  text?: string;
  role?: "user" | "ai";
}
const MemoizedMessages = React.memo(
  ({ messages }: { messages: MessageProps[] }) => (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          } animate-slideIn`}
        >
          <div
            className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-lg transition-transform hover:scale-[1.02] ${
              message.role === "user"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-4"
                : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 mr-4"
            }`}
          >
            <div
              className={`text-sm mb-1 flex items-center space-x-2 ${
                message.role === "user"
                  ? "text-blue-100"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {message.role === "user" ? (
                <>
                  <span>You</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <span>AI Assistant</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </div>
            <div
              className={
                message.role === "user"
                  ? "text-white"
                  : "text-gray-800 dark:text-gray-200"
              }
            >
              <MessageContent text={message.text || ""} />
            </div>
          </div>
        </div>
      ))}
    </>
  )
);

export default MemoizedMessages;
