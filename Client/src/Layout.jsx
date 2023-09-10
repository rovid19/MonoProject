import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="main">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="outlet">
        {" "}
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
