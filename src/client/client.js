import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Components
import App from './containers/AppContainer.js';

// Redux
import { Provider } from 'react-redux';
import createStore from '../universal/redux/createStore.js';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const store = createStore(history);

const rootEl = document.getElementById('root')
const renderApp = (Component) => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Component history={history} />
        </Provider>
      </AppContainer>,
      rootEl
    );
}

injectTapEventPlugin();
registerServiceWorker();
renderApp(App);

if (module.hot) {
  module.hot.accept('./containers/AppContainer.js', () => {
    const nextApp = require('./containers/AppContainer.js');
    renderApp(nextApp);
  });
}
