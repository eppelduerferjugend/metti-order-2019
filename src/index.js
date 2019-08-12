
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import './index.scss'
import App from './components/app/app'
import * as serviceWorker from './serviceWorker'
import { updateItem, selectOrderDestination } from './actions'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

const fetchItems = async () => {
  const response = await fetch('https://metti.spaghettisfest.lu/api/item', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Basic ${btoa(`api:FPVPrLypWX2EoWVRBq6u`)}`
    }
  })

  // Update each item received
  const newItems = await response.json()
  newItems.forEach(item => store.dispatch(updateItem(item)))

  // Set initial destination to the first item's destination
  const { items, order } = store.getState()
  if (items.length > 0 && order.selectedDestination === null) {
    const firstDestination = items[0].destination.name
    store.dispatch(selectOrderDestination(firstDestination))
  }
}

fetchItems()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
