import PropTypes from "prop-types";
import Input from "../input";
import { uniqueId } from "lodash";
import Select from "../select";

const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

const defaultProps = {
  label: undefined,
  name: undefined,
};

const generateField = (FormComponent) => {
  const FieldComponent = ({ label, name, ...otherProps }) => {
    const fieldId = uniqueId("form-field-");

    return (
      <div className="mb-2">
        {label && (
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor={fieldId}
            data-testid={name ? `form-field:${name}` : "form-field"}
          >
            {label}
          </label>
        )}
        <FormComponent id={fieldId} name={name} {...otherProps} />
      </div>
    );
  };
  FieldComponent.propTypes = propTypes;
  FieldComponent.defaultProps = defaultProps;

  return FieldComponent;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Input: generateField(Input),
  Select: generateField(Select),
};
