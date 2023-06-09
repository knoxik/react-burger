import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { store } from './services/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/react-burger'>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);