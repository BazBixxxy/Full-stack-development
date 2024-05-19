import React from "react";
import CategoryNav from "../components/CategoryNav";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <CategoryNav />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
