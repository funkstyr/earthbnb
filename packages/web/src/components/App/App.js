import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

//import './App.css';
import routes from './routes';
import * as actions from '../../actions';

const { Header, Content, Footer } = Layout;

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  footer: {
    bottom: 0
  }
};

class App extends Component {
  renderRoutes = () => {
    return routes.map(route => {
      return <Route key={route.title} {...route} />;
    });
  };

  render() {
    return (
      <Router>
        <div style={styles.root}>
          <Helmet titleTemplate={`%s - NAME`} />
          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '20px 20px', marginTop: 64 }}>
              <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
                <Switch>{this.renderRoutes()}</Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center', bottom: 0 }}>
              NAME ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state = {}) => {
  const { navCollapsed } = state.display;
  return {
    navCollapsed
  };
};

export default connect(
  mapStateToProps,
  actions
)(App);
