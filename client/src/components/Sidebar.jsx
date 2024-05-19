import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = ({ handleEvent }) => {
  return (
    <div className="relative w-full mt-16 pt-10 pl-10 pb-20 overflow-auto h-full">
      <SearchInput />
      <div className="divider"></div>
      <div onClick={handleEvent}>
        <Conversations />
      </div>
    </div>
  );
};

export default Sidebar;
