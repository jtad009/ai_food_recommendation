import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: {
    text: string;
  };
  isSender: boolean;
}

const MessageBubble = ({ message, isSender }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
          isSender
            ? "bg-primary-600 text-grey-100"
            : "bg-white text-primary-700 shadow-sm"
        } shadow-sm`}
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ ...props }) => <p className="wrap-anywhere" {...props} />,
            a: ({ ...props }) => (
              <a
                className="underline break-all"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
          }}
        >
          {message.text}
        </Markdown>
      </div>
    </div>
  );
};

export default MessageBubble;
