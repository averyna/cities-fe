import React from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.css';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <Provider store={configureStore}>
      <App />
    </Provider>
);


reportWebVitals();
