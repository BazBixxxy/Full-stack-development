import React from "react";

const Conversation = ({ conversation }) => {
  return (
    <div className="flex items-center cursor-pointer">
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
