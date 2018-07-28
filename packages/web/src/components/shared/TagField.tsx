import * as React from "react";
import { FieldProps } from "formik";
import { Form, select } from "antd";

export const TagField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
  }
> = ({
  field: { ...field, onBlur: _ }, // { name, value, onChaneg, onBlur}
  form: { touched, errors, setFieldValue },
  label,
  useNumberComponent = false, // values, setX, handleX, dirty, isValid, status
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];

  // const Comp = useNumberComponent ? InputNumber : Input;

  return (
    <Form.Item
      validateStatus={errorMessage ? "error" : undefined}
      help={errorMessage}
      label={label}
    >
      <Select
        {...field}
        {...props}
        mode="tags"
        onChange={(newValues: any) => setFieldValue(field.name, newValue)}
      />
    </Form.Item>
  );
};
