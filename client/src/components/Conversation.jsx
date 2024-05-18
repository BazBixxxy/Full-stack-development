import React from "react";
import useConversation from "../zustand/useConversation";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div
      className={`flex items-center cursor-pointer w-full p-2 rounded-md ${
        isSelected && "bg-sky-900"
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className="avatar online">
        <div className="w-14 rounded-full">
          <img src={conversation.profilePic} />
        </div>
      </div>
      <div>
        <h2 className="font-medium ml-3 capitalize text-lg">
          {conversation.username}
        </h2>
      </div>
    </div>
  );
};

export default Conversation;
