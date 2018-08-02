import * as React from "react";
import { FieldProps } from "formik";
// import { Form } from "antd";
import Dropzone from "react-dropzone";

let fileName: any;

export const DropzoneField: React.SFC<
  FieldProps<any> & {
    prefix: React.ReactNode;
    label?: string;
  }
> = ({
  field: { name },
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <div>
      <Dropzone
        onDrop={([file]) => {
          console.log("file ", file);
          fileName = file;
          setFieldValue(name, file);
        }}
        multiple={false}
        accept="image/*"
        {...props}
      >
        <p>Drag picture, or click to select</p>
      </Dropzone>
      <h3>Picture: {(fileName && fileName.name) || ""}</h3>
    </div>
  );
};
