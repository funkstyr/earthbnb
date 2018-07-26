import * as React from "react";

import { render } from "react-dom";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

// import registerServiceWorker from './registerServiceWorker';
import App from "./components";
import reducers from "./reducers";
import { loadState, saveState } from "./utils";

const rootElement = document.getElementById("root");
const presistedState = loadState();
const store = createStore(
  reducers,
  { ...presistedState },
  applyMiddleware(reduxThunk)
);

store.subscribe(() => saveState({ display: store.getState().display }));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

declare var module: any;

if (module.hot) {
  module.hot.accept("./components/App/App", () => {
    const NextApp = require("./components/App/App").default;

    render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootElement
    );
  });
}
// registerServiceWorker();
