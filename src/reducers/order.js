
const initialOrder = {
  preview: false,
  table: null,
  waiter: null,
  comment: null,
  itemQuantities: {},
  destinationComments: {},
  selectedDestination: null,
}

export default function reducer (state = initialOrder, action) {
  switch (action.type) {
    case 'ORDER_SET_PREVIEW': {
      const order = Object.assign({}, state)
      order.preview = action.preview
      return order
    }

    case 'ORDER_SELECT_DESTINATION': {
      const order = Object.assign({}, state)
      order.selectedDestination = action.destination
      return order
    }

    case 'ORDER_CHANGE_QUANTITY': {
      const order = Object.assign({}, state)
      const { id, quantity } = action

      if (quantity > 0) {
        order.itemQuantities[id] = quantity
      } else {
        delete order.itemQuantities[id]
      }

      return order
    }

    case 'ORDER_SET_DESTINATION_COMMENT': {
      const order = Object.assign({}, state)
      const { destination, comment } = action

      if (comment) {
        order.destinationComments[destination] = comment
      } else {
        delete order.destinationComments[destination]
      }

      return order
    }

    case 'ORDER_SET_TABLE': {
      const order = Object.assign({}, state)
      const { table } = action
      order.table = table
      return order
    }

    case 'ORDER_SET_WAITER': {
      const order = Object.assign({}, state)
      const { waiter } = action
      order.waiter = waiter
      return order
    }

    case 'ORDER_RESET': {
      return initialOrder
    }

    default: {
      return state
    }
  }
}
