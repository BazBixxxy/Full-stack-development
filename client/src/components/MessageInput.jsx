import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useConversation from "../zustand/useConversation";
import axios from "axios";

const MessageInput = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={sendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-md block w-full py-2 px-5 bg-gray-700 border-gray-600 text-white"
          placeholder="send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400"
        >
          {loading ? (
            <span className="loading loading-ring"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
