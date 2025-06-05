import React from "react";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
export const MessageContent = ({ text }: { text: string }) => {
  const MemoizedSyntaxHighlighter = React.memo(
    ({
      code,
      language,
      rest,
    }: {
      code: string;
      language: string;
      rest: any;
    }) => (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: "0 0 0.5rem 0.5rem",
        }}
        {...rest}
      >
        {code}
      </SyntaxHighlighter>
    )
  );
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-3 last:mb-0 ">{children}</p>,
        ul: ({ children }) => (
          <ul className="mb-3 list-disc pl-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3 list-decimal pl-4 space-y-1">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mb-3">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-bold mb-2">{children}</h3>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-500 hover:text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-3 italic">
            {children}
          </blockquote>
        ),
        code({ node, className, children, ...props }) {
          const isInline = !className;
          const match = /language-(\w+)/.exec(className || "");
          const { ...rest } = props;
          return !isInline && match ? (
            <div className="rounded-lg overflow-hidden my-3">
              <div className="bg-gray-800 px-4 py-2 text-xs text-gray-200 uppercase">
                {match[1]}
              </div>
              <MemoizedSyntaxHighlighter
                code={String(children).replace(/\n$/, "")}
                language={match[1]}
                rest={rest}
              />
            </div>
          ) : (
            <code
              className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};
