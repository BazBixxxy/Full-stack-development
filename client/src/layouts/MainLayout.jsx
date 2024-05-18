import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Outlet />
    </>
  );
};

export default MainLayout;
