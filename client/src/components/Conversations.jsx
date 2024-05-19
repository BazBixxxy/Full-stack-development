import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setConversations(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  // console.log(conversations);
  return (
    <div className="w-11/12 flex flex-col gap-7 overflow-auto px-2">
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
      {loading && <span className="loading loading-spinner"></span>}
    </div>
  );
};

export default Conversations;
