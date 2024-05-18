import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="flex flex-col px-5 w-full h-screen p-2 pt-36">
      <div className="bg-slate-700 px-4 py-2 p-2">
        <span className="text-slate-400">Baz Bixxxy</span>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
