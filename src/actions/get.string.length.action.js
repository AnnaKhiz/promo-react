export const getStringLengthAction = (element) => {
  return {
    type: 'GET_STRING_LENGTH',
    payload: element.target.value
  }
}