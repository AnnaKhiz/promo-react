export const getPromoCountAction = (element) => {
  return {
    type: 'GET_COUNT_PROMO',
    payload: element.target.value
  }
}