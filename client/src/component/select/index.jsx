import { SelectLabel, SelectValue } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  Select as UiSelect,
} from "../ui/select";
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  trigger: PropTypes.string,
  options: PropTypes.array,
};
const defaultProps = {
  className: "",
  trigger: "",
  options: [],
};

const Select = ({ className, trigger, options, onChange }) => {
  const handleChange = (value) => {
    onChange(value);
  };
  return (
    <UiSelect onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={trigger} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option} className="p-3">
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </UiSelect>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
export default Select;
