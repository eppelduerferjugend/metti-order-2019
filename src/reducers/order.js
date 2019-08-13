
const initialOrder = {
  // Workflow step (order, preview, completion)
  workflowStep: 'order',

  // Order meta
  table: '',
  waiter: '',

  // Object mapping item ids to quantities
  itemQuantities: {},

  // Object mapping destination names to comment strings
  destinationComments: {},

  // Destination selected in the order workflow step
  selectedDestination: null,

  // Loading state in the completion workflow step
  loading: false,
  error: null,
}

export default function reducer (state = initialOrder, action) {
  switch (action.type) {
    case 'ORDER_CHANGE_WORKFLOW_STEP': {
      return { ...state, workflowStep: action.workflowStep }
    }

    case 'ORDER_SELECT_DESTINATION': {
      return { ...state, selectedDestination: action.destination }
    }

    case 'ORDER_CHANGE_QUANTITY': {
      const order = { ...state }
      const { id, quantity } = action

      // Copy item quantities object
      order.itemQuantities = { ...order.itemQuantities }

      if (quantity > 0) {
        order.itemQuantities[id] = quantity
      } else {
        delete order.itemQuantities[id]
      }

      return order
    }

    case 'ORDER_SET_DESTINATION_COMMENT': {
      const order = { ...state }
      const { destination, comment } = action

      // Copy destination comments object
      order.destinationComments = { ...order.destinationComments }

      if (comment) {
        order.destinationComments[destination] = comment
      } else {
        delete order.destinationComments[destination]
      }

      return order
    }

    case 'ORDER_SET_TABLE': {
      return { ...state, table: action.table }
    }

    case 'ORDER_SET_WAITER': {
      return { ...state, waiter: action.waiter }
    }

    case 'ORDER_SET_LOADING': {
      return { ...state, loading: action.loading, error: action.error }
    }

    case 'ORDER_RESET': {
      const order = Object.assign({}, initialOrder)
      // Keep facts intact
      order.selectedDestination = state.selectedDestination
      order.waiter = state.waiter
      return order
    }

    default: {
      return state
    }
  }
}
