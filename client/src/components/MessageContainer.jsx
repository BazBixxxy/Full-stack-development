import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id);

  return (
    <div className="flex flex-col px-5 w-full h-screen p-2 pt-36">
      <div className="bg-slate-700 px-4 py-2 p-2 flex items-center gap-5 rounded shadow">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-8 rounded-full">
            <img
              src={
                !selectedConversation?.profilePic
                  ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  : selectedConversation.profilePic
              }
            />
          </div>
        </div>
        <span className="text-slate-400 capitalize">
          {selectedConversation?.username}
        </span>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
