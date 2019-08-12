
export const updateItem = item => ({
  type: 'ITEM_UPDATE',
  item,
})

export const setOrderPreview = (preview) => ({
  type: 'ORDER_SET_PREVIEW',
  preview,
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

export const resetOrder = () => ({
  type: 'ORDER_RESET',
})
