import React from "react";
import DashboardSvg from "../asset/svgs/dashboard";
import ExamSvg from "../asset/svgs/exam";
import ResultSvg from "../asset/svgs/result";
import ProfileSvg from "../asset/svgs/profile";
import { Link, useLocation } from "react-router-dom";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: DashboardSvg,
    link: "/",
  },
  {
    name: "Exam",
    icon: ExamSvg,
    link: "/exam",
  },
  {
    name: "Result",
    icon: ResultSvg,
    link: "/result",
  },
  {
    name: "Profile",
    icon: ProfileSvg,
    link: "/profile",
  },
];

const Sidebar = () => {
  const sidebarItemClassNames =
    "text-[#6B6B6B] border-0 py-5 hover:bg-[#38008C] hover:text-white rounded-md";
  const location = useLocation();

  return (
    <div className="flex flex-col w-full border-r-2 min-h-screen h-full">
      <div>
        <div className="py-10 px-2">
          {sidebarItems.map((sidebarItem, index) => {
            const isActive = location.pathname === sidebarItem.link;
            const activeStyle = isActive ? "text-white bg-[#38008C]" : "";
            const sidebarItemClassName = `${sidebarItemClassNames} ${activeStyle}`;

            return (
              <Link to={sidebarItem.link} key={index}>
                <div className={sidebarItemClassName}>
                  <span className="flex space-x-5 px-8 items-center w-full">
                    <sidebarItem.icon
                      style={{
                        fill: isActive ? "white" : "#6B6B6B",
                        transition: "fill 0.2s ease-in-out",
                      }}
                    />
                    <span className="text-base">{sidebarItem.name}</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
