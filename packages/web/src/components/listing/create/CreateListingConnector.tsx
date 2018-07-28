import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import CreateListing from "./CreateListing";

export class CreateListingConnector extends React.PureComponent<
  RouteComponentProps<{}>
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
