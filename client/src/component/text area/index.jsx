import * as React from "react";
import PropTypes from "prop-types";

import { cn } from "lib/utils";

const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  row: PropTypes.number,
};

const defaultProps = {
  className: "",
  onChange: () => {},
  row: 1,
};

const Textarea = React.forwardRef(
  ({ className, onChange, row, ...props }, ref) => {
    const handleChange = (event) => {
      if (event.target) {
        onChange(event.target.value, event);
      }
    };
    return (
      <textarea
        className={cn(
          "py-4 px-5 bg-white/90 border border-slate-200 rounded-xl w-full focus:outline-none text-xs",
          className
        )}
        onChange={handleChange}
        rows={row}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
