import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";

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

class App extends React.Component {
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

            <Drawer />

            <Layout.Content
              style={{
                margin: 10,
                marginTop: 55,
                paddingRight: 20,
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
)(App);
