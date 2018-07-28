import * as React from "react";
import { Form as AntForm, Button } from "antd";
import { withFormik, FormikProps, Field, Form } from "formik";
// import { NormalizedErrorMap } from "@earthbnb/controller";
import { InputField } from "../../shared/InputField";

interface FormValues {
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}

interface Props {
  // submit: (values: FormValues) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

class CreateListing extends React.PureComponent<
  FormikProps<FormValues> & Props
> {
  state = {
    page: 0
  };

  page1 = () => (
    <React.Fragment>
      <Field
        name="name"
        placeholder="Name"
        type="text"
        component={InputField}
      />
      <Field
        name="category"
        placeholder="Category"
        type="text"
        component={InputField}
      />
      <Field
        name="description"
        placeholder="Description"
        type="text"
        component={InputField}
      />
    </React.Fragment>
  );
  page2 = () => (
    <React.Fragment>
      <Field
        name="price"
        placeholder="Price"
        type="input"
        component={InputField}
      />
      <Field
        name="beds"
        placeholder="Beds"
        type="input"
        component={InputField}
      />
      <Field
        name="baths"
        placeholder="Baths"
        type="input"
        component={InputField}
      />
      <Field
        name="guests"
        placeholder="Guests"
        type="input"
        component={InputField}
      />
    </React.Fragment>
  );
  page3 = () => (
    <React.Fragment>
      <Field
        name="latitute"
        placeholder="Latitude"
        type="input"
        component={InputField}
      />
      <Field
        name="longitute"
        placeholder="Logitude"
        type="input"
        component={InputField}
      />
      <Field
        name="ammenities"
        placeholder="Ammenities"
        type="text"
        component={InputField}
      />
    </React.Fragment>
  );

  render() {
    const pages = [this.page1, this.page2, this.page3];

    return (
      <Form style={{ display: "flex" }}>
        <div style={{ width: 400, margin: "auto" }}>
          {pages[this.state.page]}
          <AntForm.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create Listing
            </Button>
          </AntForm.Item>
        </div>
      </Form>
    );
  }
}

export default withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    name: "",
    category: "",
    description: "",
    price: 0,
    beds: 0,
    baths: 0,
    guests: 0,
    latitude: 0,
    longitude: 0,
    amenities: []
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    // const errors = await props.submit(values);

    const errors = null;

    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(CreateListing);
