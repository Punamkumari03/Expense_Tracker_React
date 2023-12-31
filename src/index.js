import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContextProvider } from './store/auth-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/index';


const root = ReactDOM.createRoot(document.getElementById('root'));
const darkOrNot = localStorage.getItem('dark or not') === 'true';
root.render(
  <div className={darkOrNot ? 'dark' : null}>
  <Provider store={store}>
  <AuthContextProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </AuthContextProvider>
  </Provider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
