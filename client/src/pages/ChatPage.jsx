import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import { IoChatbubblesOutline } from "react-icons/io5";

const ChatPage = () => {
  const [checkbox, setCheckbox] = useState(false);
  const handleClick = (e) => {
    setCheckbox(e.target.checked);
  };

  return (
    <div className="drawer drawer-end relative">
      <input
        id="my-drawer-4"
        type="checkbox"
        checked={checkbox}
        onChange={handleClick}
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Page content here */}
        <MessageContainer />
        <label
          htmlFor="my-drawer-4"
          className="drawer-button bg-primary text-white text-xl p-2 rounded-full fixed top-24 right-5 cursor-pointer"
        >
          <IoChatbubblesOutline />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu w-96 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Sidebar handleEvent={() => setCheckbox(false)} />
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex h-screen py-0 px-5 pb-3">
      <Sidebar />
      <MessageContainer />
    </section>
  );
};

export default ChatPage;
