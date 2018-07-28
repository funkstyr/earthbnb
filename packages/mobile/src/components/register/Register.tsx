import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import { registerSchema } from "@earthbnb/common";

import { InputField } from "../shared/InputField";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class Register extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Card>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Register</Text>
          <Field
            name="email"
            placeholder="Email"
            component={InputField}
            containerStyle={{ width: "100%" }}
          />
          <Field
            name="password"
            secureTextEntry={true}
            placeholder="Password"
            component={InputField}
            containerStyle={{ width: "100%" }}
          />
          <Button
            title="Submit"
            style={{ marginTop: 30 }}
            onPress={handleSubmit as any}
          />
        </Card>
      </View>
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
    }
  }
})(Register);
