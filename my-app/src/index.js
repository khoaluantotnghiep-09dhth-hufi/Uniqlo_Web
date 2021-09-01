import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import Screen_Cart from './screens/Screen_Category/index'
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux';
import myReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { icons } from './Admin/assets/icons';
const store = createStore(myReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
);
React.icons = icons;
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>

      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
