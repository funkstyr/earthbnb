import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const InputField: React.SFC<
  FieldProps<any> & { prefix: React.ReactNode }
> = ({
  field, // { name, value, onChaneg, onBlur}
  form: { touched, errors }, // values, setX, handleX, dirty, isValid, status
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <Form.Item
      validateStatus={errorMessage ? "error" : undefined}
      help={errorMessage}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};
