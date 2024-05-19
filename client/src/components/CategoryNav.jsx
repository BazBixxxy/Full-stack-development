import React from "react";
import { GiClothes } from "react-icons/gi";

const list = [
  "All",
  "Design",
  "Nature",
  "Beauty",
  "Quotes",
  "Inspiration",
  "Other",
];

const CategoryNav = () => {
  return (
    <div className="flex justify-between bg-base-100 p-8 fixed top-16 w-full z-30 pb-1">
      <ul className="flex justify-between gap-3 font-medium my-5 w-full overflow-y-auto example">
        {list.map((item) => (
          <li
            className="p-2 px-3 w-28 btn-disabled bg-primary rounded-full text-center cursor-pointer"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNav;
