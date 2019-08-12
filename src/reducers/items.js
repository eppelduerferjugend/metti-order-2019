
const defaultState = []

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case 'ITEM_UPDATE': {
      const items = state.slice()
      const index = items.findIndex(item => item.id === action.item.id)

      // Append new or replace existing item
      if (index === -1) {
        items.push(action.item)
      } else {
        items.splice(index, 1, action.item)
      }

      // Keep items array sorted
      items.sort((a, b) => a.sorting_nr - b.sorting_nr)
      return items
    }

    default: {
      return state
    }
  }
}
