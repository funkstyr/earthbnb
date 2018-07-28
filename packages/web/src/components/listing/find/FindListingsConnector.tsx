import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { withFindListings, NewPropsCreateListing } from "@earthbnb/controller";

import FindListings from "./FindListings";

class FindListingsConnector extends React.PureComponent<
  RouteComponentProps<{}> & NewPropsCreateListing
> {
  onFinish = () => {
    this.props.history.push("/dash");
  };

  render() {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <FindListings onFinish={this.onFinish} />
    );
  }
}

export default withFindListings(FindListingsConnector);
