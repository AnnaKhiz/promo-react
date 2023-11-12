export const getCustomDictionaryAction = (customDictionary) => {
  return {
    type: 'GET_CUSTOM_DICT',
    payload: customDictionary.value
  }
}