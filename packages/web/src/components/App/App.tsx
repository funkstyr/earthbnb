import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import routes from "./routes";
import * as actions from "../../actions";

const root: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

class App extends React.Component {
  renderRoutes = () => {
    return routes.map(route => {
      return <Route key={route.title} {...route} />;
    });
  };

  public render() {
    return (
      <Router>
        <div style={root}>
          <Helmet titleTemplate={`%s - Seed`} />
          <Layout>
            <Header />

            <Layout.Content style={{ padding: "20px 20px", marginTop: 64 }}>
              <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
                <Switch>{this.renderRoutes()}</Switch>
              </div>
            </Layout.Content>

            <Footer />
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
