import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";

import store from './store/ReduxStore';
import App from './App';

// import './index.css';
import "./global.css";
import { PersistGate } from 'redux-persist/integration/react';

export let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);