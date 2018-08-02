import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import { withMe } from "@earthbnb/controller";

import "./App.css";
import Header from "./components/Header";
import { Routes } from "./components/Routes";
import * as actions from "../../actions";
import Drawer from "./components/Drawer";

const root: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

interface Props {
  me: any;
}

class App extends React.Component<Props> {
  public render() {
    return (
      <Router>
        <div style={root}>
          <Helmet titleTemplate={`%s - Seed`} />
          <Layout
            style={{
              minHeight: "100vh",
              display: "flex",
              width: "100%",
              height: "100%",
              overflow: "hidden"
            }}
          >
            <Header />

            {this.props.me && this.props.me.email && <Drawer />}

            <Layout.Content
              style={{
                overflowY: "scroll"
              }}
            >
              <div>
                <Routes />
              </div>
            </Layout.Content>
          </Layout>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: any = {}) => {
  const { navCollapsed } = state.display;
  return {
    navCollapsed
  };
};

export default connect(
  mapStateToProps,
  actions
)(withMe(App));
