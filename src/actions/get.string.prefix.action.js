export const getStringPrefixAction = (element) => {
  return {
    type: 'GET_STRING_PREFIX',
    payload: element.target.value
  }
}