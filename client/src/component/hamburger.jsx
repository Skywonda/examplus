import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const defaultProps = {
  isMenuOpen: false,
  toggleMenu: () => {},
};

const Hamburger = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      <button
        className="relative z-10 mt-5: md:m-0"
        onClick={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
      >
        <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${isMenuOpen ? "hidden" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="2em"
            width="2em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${isMenuOpen ? "" : "hidden"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            height="2em"
            width="2em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

Hamburger.propTypes = propTypes;
Hamburger.defaultProps = defaultProps;

export default Hamburger;
