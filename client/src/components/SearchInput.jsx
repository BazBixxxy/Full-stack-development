import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <div>
      <form className="flex gap-2">
        <input type="search" className="input input-bordered" />
        <button className="bg-primary text-white w-14 flex items-center justify-center p-2 rounded-md">
          <FaSearch className="text-lg" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
