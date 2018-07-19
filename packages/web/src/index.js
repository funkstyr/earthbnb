import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

//import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components';
import reducers from './reducers';
import { loadState, saveState } from './utils';

const rootElement = document.getElementById('root');
const persistedState = loadState();
const store = createStore(
  reducers,
  { ...persistedState },
  applyMiddleware(reduxThunk)
);

store.subscribe(() => saveState({ display: store.getState().display }));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const NextApp = require('./components/App/App').default;

    render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootElement
    );
  });
}

//registerServiceWorker();
