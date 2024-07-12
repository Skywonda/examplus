import React from "react";
import PropTypes from "prop-types";
import { cn } from "lib/utils";

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: "",
  type: "text",
  onChange: () => {},
};

const Input = React.forwardRef(
  ({ className, type, onChange, ...othersProps }, ref) => {
    const handleChange = (event) => {
      if (event.target) {
        onChange(event.target.value, event);
      }
    };
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...othersProps}
      />
    );
  }
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
