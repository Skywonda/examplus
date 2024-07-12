import React from "react";
import { Formik, Form as FormikForm, Field as FormikField } from "formik";
import { get, mapValues } from "lodash";

import Field from "./field";

const Form = ({ ...otherProps }) => <Formik {...otherProps} />;

Form.Element = (props) => (
  <FormikForm noValidate {...props} className="w-full h-full" />
);

Form.Field = mapValues(Field, (FieldComponent) => ({ name, ...props }) => (
  <FormikField name={name}>
    {({ field, form: { setFieldValue } }) => (
      <FieldComponent
        {...field}
        {...props}
        name={name}
        onChange={(value) => setFieldValue(name, value)}
      />
    )}
  </FormikField>
));

Form.initialValues = (data, getFieldValues) =>
  getFieldValues((key, defaultValue = "") => {
    const value = get(data, key);
    return value === undefined || value === null ? defaultValue : value;
  });

export default Form;
