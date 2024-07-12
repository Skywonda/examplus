import React from "react";
import PropTypes from "prop-types";
import { buttonVariants } from "../ui/button";

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isWorking: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  children: undefined,
  disabled: false,
  isWorking: false,
  onClick: () => {},
};

const Button = ({
  className,
  children,
  disabled,
  isWorking,
  onClick,
  ...otherProps
}) => {
  const content = isWorking ? "Loading.." : children;

  return (
    <button
      className={`w-fit font-semibold py-2 px-8 border hover:border-transparent bg-[#38008C] text-white rounded ${className}`}
      disabled={disabled || isWorking}
      onClick={onClick}
      {...otherProps}
    >
      {content && <p>{content}</p>}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
