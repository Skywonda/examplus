/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import logo from "../asset/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-5 border-b-2 px-5">
      <div className="hidden md:flex justify-between font-semibold text-[#1d1d25] ">
        <div className="flex space-x-20 items-center">
          <div className="flex items-center px-10">
            <img src={logo} alt="logo" className="w-[41px] h-[27px]" />
            <Link to={""}>
              <h1 className="text-lg font-bold">Examplus</h1>
            </Link>
          </div>
          <span>Hi, Samuel 👋</span>
        </div>

        <div className="flex space-x-5 items-center cursor-pointer">
          <div className="flex items-center rounded-full overflow-hidden w-[51px] h-[51px] b-[1.2px]">
            <img
              src="https://s3-alpha-sig.figma.com/img/7765/4bdc/77b561e7d6f42d691132e581ce49b63d?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Uh9SyeulbQAe1VGrZMIyRRrNb8YyoqHhK6Q-yqnxHyXlirZb4VtRPq9gkEmB9MIHToblLTfxbf0xAewJ1HT1dMdEBCmD6S3vdj98JF59uqOnen9yZEIzVB70goZU2Wy8CwS~hq-H2iLDIx0F2M8GhM8CXKmwSgGetr5Kx-UO8Fz4DbvRUiWggWe8JUfmkxH0agLl6vEuT3iAkeoH3uiRVhoLCmWsG-Ftdl1zomTHUoPtbUGt0DHcz3smgpXtSjG2-~0Vy7od3AZNUDNIxZKdsuGq~Wmwq0PPkUcsU1dGv-g4gx3qVrWAxlMdDQHIy3cmpkqNmpp0u4613LOqFwPEhQ__"
              alt="profile image"
            />
          </div>
          <div className="flex flex-col text-sm">
            <p>Samuel Ayobami</p>
            <span className="text-[#D47024] text-xs">View profile</span>
          </div>
          <div>
            <svg
              width="46"
              height="49"
              viewBox="0 0 46 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="45"
                height="48.0004"
                rx="7.5"
                stroke="black"
              />
              <path
                d="M35.707 28.293L33 25.586V22C32.9969 19.5218 32.075 17.1328 30.4126 15.295C28.7502 13.4571 26.4654 12.3009 24 12.05V10H22V12.05C19.5346 12.3009 17.2498 13.4571 15.5874 15.295C13.925 17.1328 13.0031 19.5218 13 22V25.586L10.293 28.293C10.1055 28.4805 10.0001 28.7348 10 29V32C10 32.2652 10.1054 32.5196 10.2929 32.7071C10.4804 32.8946 10.7348 33 11 33H18V33.777C17.9778 35.0458 18.4248 36.278 19.2553 37.2375C20.0857 38.197 21.2412 38.816 22.5 38.976C23.1952 39.0449 23.8971 38.9676 24.5606 38.749C25.2241 38.5304 25.8345 38.1753 26.3525 37.7066C26.8706 37.2379 27.2848 36.666 27.5685 36.0277C27.8522 35.3893 27.9992 34.6986 28 34V33H35C35.2652 33 35.5196 32.8946 35.7071 32.7071C35.8946 32.5196 36 32.2652 36 32V29C35.9999 28.7348 35.8946 28.4805 35.707 28.293ZM26 34C26 34.7956 25.6839 35.5587 25.1213 36.1213C24.5587 36.6839 23.7956 37 23 37C22.2044 37 21.4413 36.6839 20.8787 36.1213C20.3161 35.5587 20 34.7956 20 34V33H26V34ZM34 31H12V29.414L14.707 26.707C14.8945 26.5195 14.9999 26.2652 15 26V22C15 19.8783 15.8429 17.8434 17.3431 16.3431C18.8434 14.8429 20.8783 14 23 14C25.1217 14 27.1566 14.8429 28.6569 16.3431C30.1571 17.8434 31 19.8783 31 22V26C31.0001 26.2652 31.1054 26.5195 31.293 26.707L34 29.414V31Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
