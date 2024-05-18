import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import useConversation from "../zustand/useConversation";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const lastMessageRef = useRef();

  useListenMessages();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  // console.log(messages)

  return (
    <>
      <div className="px-4 h-full overflow-auto">
        {!loading &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <div key={index} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}

        {loading &&
          [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

        {!loading && messages.length === 0 && (
          <p>Tap on chat icon to start messaging</p>
        )}
      </div>
    </>
  );
};

export default Messages;
