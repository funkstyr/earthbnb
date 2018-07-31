import * as React from "react";
import { NativeRouter as Router, Route, Switch } from "react-router-native";
import { ApolloProvider } from "react-apollo";

import { client } from "./apollo";
import { RegisterConnector } from "./components/register/RegisterConnector";
import { LoginConnector } from "./components/login/LoginConnector";
import { Me } from "./components/user/Me";

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router initialEntries={["/login"]}>
          <Switch>
            <Route
              exact={true}
              path="/register"
              component={RegisterConnector}
            />
            <Route exact={true} path="/login" component={LoginConnector} />
            <Route exact={true} path="/me" component={Me} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}
