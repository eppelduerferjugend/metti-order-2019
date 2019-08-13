
import './index.scss'
import * as serviceWorker from './serviceWorker'
import App from './components/app/app'
import React from 'react'
import rootReducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { updateConfig } from './actions'

// Bind elements
const $root = document.getElementById('metti-root')
const $config = document.getElementById('metti-config')

// Create store
const store = createStore(rootReducer)

// Read config
const config = JSON.parse($config.innerHTML)
store.dispatch(updateConfig(config))

// Render app
render(
  <Provider store={store}>
    <App />
  </Provider>,
  $root
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
