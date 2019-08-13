
import config from './config'
import items from './items'
import order from './order'
import { combineReducers } from 'redux'

export default combineReducers({
  config,
  items,
  order,
})
