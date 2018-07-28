import * as React from "react";
import { Button, Steps, message } from "antd";
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

  next = () => {
    const page = this.state.page + 1;
    this.setState({ page });
  };

  prev = () => {
    const page = this.state.page - 1;
    this.setState({ page });
  };

  page1 = (
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
  page2 = (
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
  page3 = (
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

    const { page } = this.state;

    return (
      <Form style={{ display: "flex" }}>
        <div style={{ margin: "auto", width: "60%" }}>
          <h1>Create Listing</h1>
          <Steps current={this.state.page}>
            <Steps.Step title={"Description"} />
            <Steps.Step title={"Details"} />
            <Steps.Step title={"Amenities"} />
          </Steps>

          <div className="steps-content">{pages[this.state.page]}</div>

          <div className="steps-action">
            {page < pages.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {page === pages.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Create Listing")}
              >
                Create Listing
              </Button>
            )}
            {page > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
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
