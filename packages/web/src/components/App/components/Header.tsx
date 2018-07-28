import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";

class Header extends React.Component {
  public render() {
    return (
      <Layout.Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <a href={process.env.REACT_APP_SERVER_URL} target="_blank">
              API
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/create-listing">New Listing</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/listings">Listings</Link>
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

export default Header;
