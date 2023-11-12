const defaultStateTextarea = {
  value: ''
}

export const textareaReducer = (state = defaultStateTextarea, action) => {
  switch (action.type) {
    case "GET_CUSTOM_DICT": {
      return {...state, value: action.payload}
    }
    default:
      return defaultStateTextarea
  }
}