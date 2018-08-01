import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout, Icon } from "antd";

class Drawer extends React.Component {
  state = {
    collapsed: true
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  public render() {
    return (
      <Layout.Sider
        collapsible={true}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
      >
        <div
          className="logo"
          style={{ height: 18, margin: 14, background: "rgba(255,255,255,.2)" }}
        />
        <Menu mode="inline">
          <Menu.Item key="o">
            <Icon type="appstore-o" />
            <span>Dashboard</span>
            <Link to="/dash" />
          </Menu.Item>

          <Menu.Item key="1">
            <Icon type="home" />
            <span>Listings</span>
            <Link to="/listings" />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="form" />
            <span>New Listing</span>
            <Link to="/create-listing" />
          </Menu.Item>
          <Menu.Item key="13">
            <Icon type="lock" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="9">
            <Icon type="api" />
            <span>API</span>
            <a href={process.env.REACT_APP_SERVER_URL} target="_blank" />
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default Drawer;
