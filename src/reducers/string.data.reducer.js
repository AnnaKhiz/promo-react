const defaultStringData = {
  stringLength: 0,
  stringPrefix: '',
  countPromo: 0
}

export const stringDataReducer = (state = defaultStringData, action) => {
  switch (action.type) {
    case 'GET_STRING_LENGTH': {
      return {...state, stringLength: action.payload}
    }
    case 'GET_STRING_PREFIX': {
      return {...state, stringPrefix: action.payload}
    }
    case 'GET_COUNT_PROMO': {
      return {...state, countPromo: action.payload}
    }
    default:
      return state
  }
}