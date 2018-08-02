import * as React from "react";
import { Button, Steps, message } from "antd";
import { withFormik, Form } from "formik";

import { withCreateListing, NewPropsCreateListing } from "@earthbnb/controller";
import { RouteComponentProps } from "react-router-dom";
import { ImageFile } from "react-dropzone";
import { AmenitySet } from "./components/Amenity";
import { DetailsSet } from "./components/DetailSet";
import { DescriptionSet } from "./components/DescriptionSet";

interface FormValues {
  name: string;
  category: string;
  description: string;
  picture: ImageFile | null;
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

  render() {
    const pages = [
      <DescriptionSet key="description" />,
      <DetailsSet key="detail" />,
      <AmenitySet key="amenity" />
    ];

    const { page } = this.state;
    const last = page === pages.length - 1;
    const next = page < pages.length - 1;
    const prev = page > 0;

    const lastButtonLayout = () => {
      return (
        (prev || last) && [
          <Button
            key="last_left"
            type="primary"
            onClick={() => (!next ? this.prev() : this.next())}
            style={{ marginRight: "auto" }}
          >
            {next ? "Next" : "Previous"}
          </Button>,
          <Button
            type="primary"
            key="last_right"
            htmlType={last ? "submit" : "button"}
            style={{ marginLeft: "auto" }}
            onClick={() => (!last ? this.prev() : null)}
          >
            {last ? "Create Listing" : "Previous"}
          </Button>
        ]
      );
    };

    const firstButtonLayout = () => {
      return (
        !prev && [
          <Button
            key="reg_right"
            type="primary"
            onClick={() => (!next ? this.prev() : this.next())}
            style={{ marginLeft: "auto" }}
          >
            {next ? "Next" : "Previous"}
          </Button>
        ]
      );
    };

    const buttonLayout = () => {
      return (
        (prev || next) && [
          <Button
            type="primary"
            key="reg_left"
            htmlType={last ? "submit" : "button"}
            style={{ marginRight: "auto" }}
            onClick={() => (!last ? this.prev() : null)}
          >
            {last ? "Create Listing" : "Previous"}
          </Button>,
          <Button
            key="reg_right"
            type="primary"
            onClick={() => (!next ? this.prev() : this.next())}
            style={{ marginLeft: "auto" }}
          >
            {next ? "Next" : "Previous"}
          </Button>
        ]
      );
    };

    return (
      <Form style={{ display: "flex", margin: 10, marginTop: 55 }}>
        <div style={{ margin: "auto", width: "60%" }}>
          <h1>Create Listing</h1>
          <Steps current={this.state.page}>
            <Steps.Step title={"Description"} />
            <Steps.Step title={"Details"} />
            <Steps.Step title={"Amenities"} />
          </Steps>

          <div className="steps-content">{pages[this.state.page]}</div>

          <div className="steps-action" style={{ display: "flex" }}>
            {!prev
              ? firstButtonLayout()
              : last
                ? lastButtonLayout()
                : buttonLayout()}
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
      picture: null,
      price: 0,
      beds: 0,
      baths: 0,
      guests: 0,
      latitude: 0,
      longitude: 0,
      amenities: []
    }),
    handleSubmit: async (values: FormValues, { props, setSubmitting }: any) => {
      console.log(values);

      await props.createListing(values);
      setSubmitting(false);
      message.success("Create Listing");
      props.onFinish();
    }
  })(CreateListing as any)
);
