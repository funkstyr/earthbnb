import * as React from "react";
import * as Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";
import { AuthRoute } from "@earthbnb/controller";

import Loading from ".//Loading";
import { Message } from "./Message";

const Landing = Loadable({
  loader: () => import("../../landing/Landing"),
  loading: Loading,
  delay: 300 // delay of showing loading
});

const Register = Loadable({
  loader: () => import("../../user/register"),
  loading: Loading,
  delay: 300
});

const ForgotPassword = Loadable({
  loader: () => import("../../user/forgotPassword"),
  loading: Loading,
  delay: 300
});

const ChangePassword = Loadable({
  loader: () => import("../../user/changePassword"),
  loading: Loading,
  delay: 300
});

const Login = Loadable({
  loader: () => import("../../user/login"),
  loading: Loading,
  delay: 300
});

const CreateListing = Loadable({
  loader: () => import("../../listing/create"),
  loading: Loading
});

const FindListings = Loadable({
  loader: () => import("../../listing/find"),
  loading: Loading
});

export class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          key="landing"
          title="Landing"
          path="/"
          exact={true}
          component={Landing}
        />
        <Route
          key="register"
          title="Register"
          path="/register"
          exact={true}
          component={Register}
        />
        <Route
          key="login"
          title="Login"
          path="/login"
          exact={true}
          component={Login}
        />
        <Route
          key="forgot password"
          title="Forgot Password"
          path="/forgot-password"
          exact={true}
          component={ForgotPassword}
        />
        <Route
          key="change password"
          title="Change Password"
          path="/change-password"
          exact={true}
          component={ChangePassword}
        />
        <Route
          key="message"
          title="Message"
          path="/m"
          exact={true}
          component={Message}
        />,
        <AuthRoute
          key="create listing"
          path="/create-listing"
          exact={true}
          component={CreateListing}
        />
        <Route
          key="listings"
          title="Listings"
          path="/listings"
          exact={true}
          component={FindListings}
        />,
      </Switch>
    );
  }
}
