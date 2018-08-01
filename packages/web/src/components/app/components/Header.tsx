import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout, Icon } from "antd";

class Header extends React.Component {
  public render() {
    return (
      <Layout.Header
        style={{ position: "fixed", zIndex: 1, width: "100%", paddingRight: 0 }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.SubMenu
            title={
              <span>
                <Icon type="ellipsis" />
              </span>
            }
            style={{ float: "right" }}
          >
            <Menu.Item key="2">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="setting:1">
              <Link to="/logout">Log Out</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    );
  }
}

export default Header;
