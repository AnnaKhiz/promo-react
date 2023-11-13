import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './app.jsx';
import store from './store.js';

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);