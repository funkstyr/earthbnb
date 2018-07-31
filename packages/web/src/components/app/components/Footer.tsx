import * as React from "react";
import { Layout } from "antd";

class Footer extends React.Component {
  public render() {
    return (
      <Layout.Footer style={{ textAlign: "center", bottom: 0 }}>
        Seed ©{new Date().getFullYear()}
      </Layout.Footer>
    );
  }
}

export default Footer;
