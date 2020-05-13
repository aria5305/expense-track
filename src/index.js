import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk'; 
import {Provider} from 'react-redux'; 
import {createStore, applyMiddleware,compose, combineReducers} from 'redux';
import authReducer from './store/reducer/auth'; 
import detailsAuth from './store/reducer/details';
import * as firebase from "firebase/app";

const rootReducer = combineReducers({
  auth:authReducer,
  details:detailsAuth
})
const composeEnhancers = process.env.NODE_ENV ==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

const firebaseConfig = {
  apiKey: "AIzaSyCNSsrjzAFwv7xEj_mhcfP2YGDmzxpqTo4",
  authDomain: "expense-tracker-67903.firebaseapp.com",
  databaseURL: "https://expense-tracker-67903.firebaseio.com",
  projectId: "expense-tracker-67903",
  storageBucket: "expense-tracker-67903.appspot.com",
  messagingSenderId: "730807404122",
  appId: "1:730807404122:web:65beba43287b11e48cba63",
  measurementId: "G-S2M45JV9LZ"
}


firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter><App /></BrowserRouter>
      </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
