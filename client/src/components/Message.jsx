import React from "react";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../utilities/extractTime";

const Message = ({ message }) => {
  const { selectedConversation } = useConversation();

  const formattedTime = extractTime(message.createdAt);

  const fromMe = message.senderId;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? `bg-blue-500` : `bg-gray-700`;
  const bubbleTextColor = fromMe ? `text-gray-800` : "";

  return (
    <div className="pt-3 pb-2">
      <div className={`chat ${chatClassName}`}>
        <div className={`chat-bubble ${bubbleBgColor} ${bubbleTextColor} pb-2`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50">
          {" "}
          <time className="chat-footer text-xs opacity-50 flex gap-1 items-center mt-auto">
            {formattedTime}
          </time>
        </div>
      </div>
    </div>
  );
};

export default Message;
