import * as React from "react";
import { Link } from "react-router-dom";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { newPasswordSchema } from "@earthbnb/common";
import { NormalizedErrorMap } from "@earthbnb/controller";
import { InputField } from "../shared/InputField";

interface FormValues {
  newPassword: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

class ChangePassword extends React.PureComponent<
  FormikProps<FormValues> & Props
> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="newPassword"
            placeholder="New Password"
            type="password"
            component={InputField}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          />

          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Change Password
            </Button>

            <Link to="/register" style={{ marginLeft: 20 }}>
              Register
            </Link>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: newPasswordSchema,
  mapPropsToValues: () => ({ newPassword: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);

    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(ChangePassword);
