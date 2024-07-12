import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const propTypes = {
  isVisible: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
  timeout: PropTypes.number,
};

const defaultProps = {
  isVisible: false,
  type: "error",
  message: "Something went wrong, please try again",
  timeout: 2000,
};

const Toast = ({ isVisible, timeout, type = "error", message }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(isVisible);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [isVisible, timeout]);

  const getToastColorClass = () => {
    return type === "success" ? "bg-green-500" : "bg-red-500";
  };

  return (
    showToast && (
      <div
        className={`fixed top-0 right-0 left-0 flex items-center justify-center h-16 w-full ${getToastColorClass()} text-white`}
        role="alert"
      >
        <span className="px-6 py-3 text-base font-bold">{message}</span>
      </div>
    )
  );
};

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

export default Toast;
