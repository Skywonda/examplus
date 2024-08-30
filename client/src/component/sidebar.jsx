import { useLocation } from "react-router-dom";
import LogoutSvg from "asset/svgs/logout";

const Sidebar = ({ items }) => {
  const sidebarItemClassNames =
    "text-[#6B6B6B] border-0 py-5 hover:bg-[#38008C] hover:text-white rounded-md";
  const location = useLocation();

  return (
    <div className="flex flex-col w-full border-r-2 min-h-screen h-full">
      <div>
        <div className="py-10 px-2">
          {items.map((sidebarItem, index) => {
            const isActive = location.pathname === sidebarItem.link;
            const activeStyle = isActive ? "text-white bg-[#38008C]" : "";
            const sidebarItemClassName = `${sidebarItemClassNames} ${activeStyle}`;

            return (
              <a href={sidebarItem.link} key={index}>
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
              </a>
            );
          })}
          <div className="h-[95px] border-t mt-20 w-full flex space-x-5 px-8 items-center bg-white hover:bg-red-500 text-red-500 hover:text-white">
            <LogoutSvg />
            <button
              className="py-2"
              onClick={() => {
                localStorage.removeItem("access_token");
                window.location.href = "/";
              }}
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
