import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';

import { reducer as formReducer } from 'redux-form';

import * as Reducers from './reducers/index.js';

export default (history) => {
  const middleware = routerMiddleware(history);

  const store = createStore(combineReducers({
    ...Reducers,
    router: routerReducer,
    form: formReducer
  }), applyMiddleware(middleware, thunkMiddleware, logger));


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
     module.hot.accept('./reducers', () => {
       const nextReducers = require('./reducers/index.js');
       const rootReducer = combineReducers({
         ...nextReducers,
         router: routerReducer,
         form: formReducer
       });

       store.replaceReducer(rootReducer);
     });
   }

  return store;
}
