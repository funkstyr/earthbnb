import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout, Icon } from "antd";
import { withMe } from "@earthbnb/controller";

interface Props {
  me: any;
}

const loggedIn = () => [
  <Menu.Item key="setting:2">
    <Link to="/dash">Dashboard</Link>
  </Menu.Item>,
  <Menu.Item key="setting:3">
    <Link to="/profile">Profile</Link>
  </Menu.Item>,
  <Menu.Item key="setting:1">
    <Link to="/logout">Log Out</Link>
  </Menu.Item>
];

class Header extends React.Component<Props> {
  public render() {
    return (
      <Layout.Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          paddingLeft: 10,
          paddingRight: 0,
          height: 50
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/">Earthbnb</Link>
          </Menu.Item>

          <Menu.SubMenu
            title={
              <span>
                <Icon type="ellipsis" />
              </span>
            }
            style={{ float: "right" }}
          >
            {this.props.me && this.props.me.email ? (
              loggedIn()
            ) : (
              <Menu.Item key="2">
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}
          </Menu.SubMenu>
        </Menu>
      </Layout.Header>
    );
  }
}

export default withMe(Header);
