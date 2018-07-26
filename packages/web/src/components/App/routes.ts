import * as Loadable from "react-loadable";

import Loading from "./components/Loading";

const Landing = Loadable({
  loader: () => import("../Landing/Landing"),
  loading: Loading,
  delay: 300 // delay of showing loading
});

export default [
  {
    title: "Landing",
    path: "/",
    component: Landing,
    exact: true
  }
];
