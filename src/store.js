import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';
import ui from './reducer/ui';
import user from './reducer/user'

// import user from './reducer/user';

const logger = createLogger();
const reducers = combineReducers({ ui, user });
export default createStore(reducers, composeWithDevTools(
  applyMiddleware()
));
