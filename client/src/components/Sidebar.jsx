import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="relative w-full mt-16 pt-10 pl-10 pb-20 overflow-auto h-full bg-white">
      <SearchInput />
      <div className="divider"></div>
      <Conversations />
    </div>
  );
};

export default Sidebar;
