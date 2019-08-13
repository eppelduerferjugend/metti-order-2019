
export const updateConfig = config => ({
  type: 'CONFIG_UPDATE',
  config,
})

export const updateItem = item => ({
  type: 'ITEM_UPDATE',
  item,
})

export const setOrderWorkflowStep = (workflowStep) => ({
  type: 'ORDER_CHANGE_WORKFLOW_STEP',
  workflowStep,
})

export const changeOrderItemQuantity = (id, quantity) => ({
  type: 'ORDER_CHANGE_QUANTITY',
  id,
  quantity,
})

export const selectOrderDestination = (destination) => ({
  type: 'ORDER_SELECT_DESTINATION',
  destination,
})

export const setOrderDestinationComment = (destination, comment) => ({
  type: 'ORDER_SET_DESTINATION_COMMENT',
  destination,
  comment,
})

export const setOrderTable = (table) => ({
  type: 'ORDER_SET_TABLE',
  table,
})

export const setOrderWaiter = (waiter) => ({
  type: 'ORDER_SET_WAITER',
  waiter,
})

export const setOrderLoading = (loading, error) => ({
  type: 'ORDER_SET_LOADING',
  loading,
  error,
})

export const resetOrder = () => ({
  type: 'ORDER_RESET',
})
