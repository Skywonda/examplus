import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ sidebarItems }) => {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <div className="w-full lg:w-[30%] xl:w-[20%]">
          <Sidebar items={sidebarItems} />
        </div>
        <div className="flex-grow w-5/6 hidden md:block ml-5">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
