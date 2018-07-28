import * as Loadable from "react-loadable";

import Loading from "./components/Loading";
import { Message } from "./components/Message";

const Landing = Loadable({
  loader: () => import("../landing/Landing"),
  loading: Loading,
  delay: 300 // delay of showing loading
});

const Register = Loadable({
  loader: () => import("../register"),
  loading: Loading,
  delay: 300
});

const ForgotPassword = Loadable({
  loader: () => import("../forgotPassword"),
  loading: Loading,
  delay: 300
});

const ChangePassword = Loadable({
  loader: () => import("../changePassword"),
  loading: Loading,
  delay: 300
});

const Login = Loadable({
  loader: () => import("../login"),
  loading: Loading,
  delay: 300
});

export default [
  {
    title: "Landing",
    path: "/",
    component: Landing,
    exact: true
  },
  {
    title: "Register",
    path: "/register",
    component: Register,
    exact: true
  },
  {
    title: "Login",
    path: "/login",
    component: Login,
    exact: true
  },
  {
    title: "Forgot Password",
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true
  },
  {
    title: "Change Password",
    path: "/change-password/:key",
    component: ChangePassword,
    exact: true
  },
  {
    title: "Message",
    path: "/m",
    component: Message
  }
];
