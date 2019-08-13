
const defaultState = {
  serviceEndpoint: 'https://metti.spaghettisfest.lu',
  serviceUsername: null,
  servicePassword: null
}

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    case 'CONFIG_UPDATE': {
      return { ...state, ...action.config }
    }

    default: {
      return state
    }
  }
}
