import {CONSTANT} from "../js/constants";

const defaultStateCheckbox = {
  digits: {
    id: 1,
    name: 'digits',
    value: CONSTANT.DIGITS,
    isChecked: false
  },
  latinLettersBig: {
    id: 2,
    name: 'latinLettersBig',
    value: CONSTANT.LETTERS_LATIN.toUpperCase(),
    isChecked: false
  },
  latinLettersSmall: {
    id: 3,
    name: 'latinLettersSmall',
    value: CONSTANT.LETTERS_LATIN.toLowerCase(),
    isChecked: false
  },
  cyrillicLettersBig: {
    id: 4,
    name: 'cyrillicLettersBig',
    value: CONSTANT.LETTERS_CYRILLIC.toUpperCase(),
    isChecked: false
  },
  cyrillicLettersSmall: {
    id: 5,
    name: 'cyrillicLettersSmall',
    value: CONSTANT.LETTERS_CYRILLIC.toLowerCase(),
    isChecked: false
  },
}

export const checkboxReducer = (state = defaultStateCheckbox, action) => {
  switch (action.type) {
    case "0-9": {
      return {
        ...state,
        digits: {
          ...state.digits,
          isChecked: !state.digits.isChecked
        },
      }
    }
    case "A-Z": {
      return {
        ...state,
        latinLettersBig: {
          ...state.latinLettersBig,
          isChecked: !state.latinLettersBig.isChecked
        },
      }
    }
    case "a-z": {
      return {
        ...state,
        latinLettersSmall: {
          ...state.latinLettersSmall,
          isChecked: !state.latinLettersSmall.isChecked
        },
      }
    }
    case "А-Я": {
      return {
        ...state,
        cyrillicLettersBig: {
          ...state.cyrillicLettersBig,
          isChecked: !state.cyrillicLettersBig.isChecked
        },
      }
    }
    case "а-я": {
      return {
        ...state,
        cyrillicLettersSmall: {
          ...state.cyrillicLettersSmall,
          isChecked: !state.cyrillicLettersSmall.isChecked
        },
      }
    }
    default: return state

  }

}