import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export class Message extends React.PureComponent<RouteComponentProps<{}>> {
  render() {
    const {
      location: { state }
    } = this.props;

    return (
      <div style={{ margin: 10, marginTop: 55, display: "flex" }}>
        <h3>Message</h3>
        {state && state.message}
      </div>
    );
  }
}
