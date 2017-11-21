import React from 'react';
import ReactDom from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import App from './App'
import Chat from './components/Chat';
import RouterTest from './components/Router'
import { Provider } from 'react-redux';
import Store from './store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import '../static/index.css';
import './styles/common.css'
import './styles/font/iconfont.css'
import './styles/emoji-sprite.css'
import './styles/base.styl'

ReactDom.render(
  <Provider store={Store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Chat} />
          <Route path="/chat" component={Chat} />
          <Route path="/router" component={RouterTest}/>
          
        </Route>
    </Router>
  </Provider>,
    document.getElementById('app'),
);
