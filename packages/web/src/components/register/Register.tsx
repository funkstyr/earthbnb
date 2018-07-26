import * as React from "react";
import * as AntD from "antd";
import { withFormik, FormikErrors, FormikProps, Field, Form } from "formik";
import { registerSchema } from "@earthbnb/common";
import { InputField } from "../shared/InputField";

const { Form: AntForm, Icon, Button } = AntD;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class Register extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          <Field
            name="email"
            placeholder="Email"
            type="text"
            component={InputField}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          />

          <Field
            name="password"
            placeholder="Password"
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
              Register
            </Button>

            <a href="" style={{ marginLeft: 20 }}>
              Login
            </a>
          </AntForm.Item>

          <AntForm.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: registerSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);

    if (errors) {
      setErrors(errors);
    }
  }
})(Register);
