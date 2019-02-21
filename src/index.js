import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
} from "react-router-dom";

window.USER_CAN_TOUCH = false;
const onFirstTouch = (event) => {
  console.log("here")
  window.USER_CAN_TOUCH = true;
}


window.addEventListener('touchstart', onFirstTouch);

// window.setTimeout(() => {
//   window.removeEventListener('touchstart', onFirstTouch);
// },  60000);
ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
