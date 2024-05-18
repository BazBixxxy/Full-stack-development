import React from "react";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../utilities/extractTime";
import { useAuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  const { selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const formattedTime = extractTime(message.createdAt);

  // * the message is only from me if the message sender id is equal to mine
  const fromMe = message.senderId === authUser._id;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? `bg-blue-500` : `bg-gray-600`;
  const bubbleTextColor = fromMe ? `text-gray-800` : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className="pt-3 pb-2">
      <div className={`chat ${chatClassName}`}>
        <div className={`chat-bubble ${bubbleBgColor} ${bubbleTextColor} ${shakeClass} pb-2 text-white`}>
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
