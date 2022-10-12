import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { rootReducer } from './services/reducers';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);