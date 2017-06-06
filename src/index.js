import React from 'react';
import thunkMiddleware from 'redux-thunk'
import { createLogger }  from 'redux-logger'
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux'
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded, fetchData } from './actions'
import { Provider } from 'react-redux'
import generator from './reducers'
import App from './App';
import './index.css';

const loggerMiddleware = createLogger()

const store = createStore(
  generator,
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    )
  )

// store.dispatch(selectSubreddit('reactjs'))

// store.dispatch(fetchPostsIfNeeded('reactjs')).then(() =>
//   console.log(store.getState())
// )
store.dispatch(fetchData()).then(() =>
  console.log(store.getState(), "GETTER")
)

ReactDOM.render(
  
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
