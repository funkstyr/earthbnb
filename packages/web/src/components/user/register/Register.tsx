import * as React from "react";
import { Link } from "react-router-dom";
import { Form as AntForm, Icon, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
import { registerSchema } from "@earthbnb/common";
import { NormalizedErrorMap } from "@earthbnb/controller";
import { InputField } from "../../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

class Register extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    return (
      <Form style={{ display: "flex", margin: 10, marginTop: 55 }}>
        <div style={{ width: 400, margin: "auto" }}>
          <h1>Register</h1>
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

            <Link to="/login" style={{ marginLeft: 20 }}>
              Login
            </Link>
          </AntForm.Item>

          <AntForm.Item>
            <Link className="login-form-forgot" to="/forgot-password">
              Forgot password
            </Link>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: registerSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);

    if (errors) {
      setErrors(errors);
      if (errors.email.includes("ethereal.email")) {
        console.log("email url: ", errors.email);

        props.onFinish();
      } else {
        setErrors(errors);
      }
    } else {
      props.onFinish();
    }
  }
})(Register);
