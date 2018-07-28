import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export class Message extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    const {
      location: { state }
    } = this.props;

    return (
      <div>
        <h3>Message</h3>
        {state && state.message}
      </div>
    );
  }
}
