import * as React from "react";
import { Button, Steps, message } from "antd";
import { withFormik, Field, Form } from "formik";

import { InputField } from "../../shared/InputField";
import { TagField } from "../../shared/TagField";
import { withCreateListing, NewPropsCreateListing } from "@earthbnb/controller";
import { RouteComponentProps } from "react-router-dom";

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

// interface Props {
//   onFinish: () => void;
// }

interface State {
  page: number;
}

class CreateListing extends React.PureComponent<
  RouteComponentProps<{}> & NewPropsCreateListing,
  State
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
        label="Name"
        useNumberComponent={false}
      />
      <Field
        name="category"
        placeholder="Category"
        label="Category"
        useNumberComponent={false}
        type="text"
        component={InputField}
      />
      <Field
        name="description"
        placeholder="Description"
        label="Description"
        useNumberComponent={false}
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
        label="Price"
        useNumberComponent={true}
        type="input"
        component={InputField}
      />
      <Field
        name="beds"
        placeholder="Beds"
        label="Beds"
        useNumberComponent={true}
        type="input"
        component={InputField}
      />
      <Field
        name="baths"
        placeholder="Baths"
        label="Baths"
        useNumberComponent={true}
        type="input"
        component={InputField}
      />
      <Field
        name="guests"
        placeholder="Guests"
        label="Guests"
        useNumberComponent={true}
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
        label="Latitude"
        useNumberComponent={true}
        type="input"
        component={InputField}
      />
      <Field
        name="longitute"
        placeholder="Logitude"
        label="Longitude"
        useNumberComponent={true}
        type="input"
        component={InputField}
      />
      <Field
        name="ammenities"
        placeholder="Ammenities"
        label="Amenities"
        component={TagField}
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

          <div className="steps-action" style={{ display: "flex" }}>
            {page < pages.length - 1 && (
              <Button
                type="primary"
                onClick={() => this.next()}
                style={{ marginRight: "auto" }}
              >
                Next
              </Button>
            )}
            {page === pages.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "auto" }}
              >
                Create Listing
              </Button>
            )}
            {page > 0 && (
              <Button
                style={{ marginLeft: "auto" }}
                onClick={() => this.prev()}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </Form>
    );
  }
}

export default withCreateListing(
  withFormik<{}, FormValues>({
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
    handleSubmit: async (values: FormValues, { props, setSubmitting }: any) => {
      await props.createListing(values);
      setSubmitting(false);
      message.success("Create Listing");
      props.onFinish();
    }
  })(CreateListing as any)
);
