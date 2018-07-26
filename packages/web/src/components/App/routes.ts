import * as Loadable from "react-loadable";

import Loading from "./components/Loading";

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
  }
];
