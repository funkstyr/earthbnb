import * as React from "react";
import * as yup from "yup";
import { Form, Icon, Input, Button } from "antd";
import { withFormik, FormikErrors, FormikProps } from "formik";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class Register extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      touched,
      errors
    } = this.props;

    return (
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <div style={{ width: 400, margin: "auto" }}>
          <Form.Item
            validateStatus={touched.email && errors.email ? "error" : undefined}
            help={touched.email && errors.email ? errors.email : ""}
          >
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Form.Item
            help={touched.password && errors.password ? errors.password : ""}
            validateStatus={
              touched.password && errors.password ? "error" : undefined
            }
          >
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Form.Item>
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
          </Form.Item>

          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
        </div>
      </form>
    );
  }
}

const shortEmail = "email must be at least 3 characters";
const invalidEmail = "must be a valid email";

const shortPassword = "password must be at least 3 characters";

const emailValidation = yup
  .string()
  .min(3, shortEmail)
  .max(255)
  .email(invalidEmail)
  .required();

const passwordValidation = yup
  .string()
  .min(3, shortPassword)
  .max(255)
  .required();

const validationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation
});

export default withFormik<Props, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);

    if (errors) {
      setErrors(errors);
    }
  }
})(Register);
