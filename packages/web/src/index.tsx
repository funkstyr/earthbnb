import * as React from "react";

import { render } from "react-dom";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { ApolloProvider } from "react-apollo";

// import registerServiceWorker from './registerServiceWorker';
import App from "./components";
import reducers from "./reducers";
import { loadState, saveState } from "./utils";
import { client } from "./apollo";

const rootElement = document.getElementById("root");
const presistedState = loadState();
const store = createStore(
  reducers,
  { ...presistedState },
  applyMiddleware(reduxThunk)
);

store.subscribe(() => saveState({ display: store.getState().display }));

// todo: make function for providers to resuse for app/nextapp
render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  rootElement
);

declare var module: any;

if (module.hot) {
  module.hot.accept("./components/app/App", () => {
    const NextApp = require("./components/app/App").default;

    render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </ApolloProvider>,
      rootElement
    );
  });
}
// registerServiceWorker();
