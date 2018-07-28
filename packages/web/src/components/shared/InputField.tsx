import * as React from "react";
import { FieldProps } from "formik";
import { Form, Input, InputNumber } from "antd";

export const InputField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
    userNumberComponent?: boolean;
  }
> = ({
  field: { onChange, ...field }, // { name, value, onChaneg, onBlur}
  form: { touched, errors, setFieldValue },
  label,
  useNumberComponent = false, // values, setX, handleX, dirty, isValid, status
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];

  const Comp = useNumberComponent ? InputNumber : Input;

  return (
    <Form.Item
      validateStatus={errorMessage ? "error" : undefined}
      help={errorMessage}
      label={label}
    >
      <Comp
        {...field}
        {...props}
        onChange={
          useNumberComponent
            ? (newValues: any) => setFieldValue(field.name, newValue)
            : onChange
        }
      />
    </Form.Item>
  );
};
