import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { withCreateListing, NewPropsCreateListing } from "@earthbnb/controller";

import CreateListing from "./CreateListing";

class CreateListingConnector extends React.PureComponent<
  RouteComponentProps<{}> & NewPropsCreateListing
> {
  onFinish = () => {
    this.props.history.push("/dash");
  };

  render() {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <CreateListing onFinish={this.onFinish} />
    );
  }
}

export default withCreateListing(CreateListingConnector);
