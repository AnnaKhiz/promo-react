import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCheckboxAction} from '../actions';

export const ElementCheckbox = (props) => {
const dispatch = useDispatch();
  const restArray = [];

  const digitsValue = useSelector(store => store.checkboxReducer.digits.value);
  const latinLettersBigValue = useSelector(store => store.checkboxReducer.latinLettersBig.value);
  const latinLettersSmallValue = useSelector(store => store.checkboxReducer.latinLettersSmall.value);
  const cyrillicLettersBigValue = useSelector(store => store.checkboxReducer.cyrillicLettersBig.value);
  const cyrillicLettersSmallValue = useSelector(store => store.checkboxReducer.cyrillicLettersSmall.value);

  let digitIsChecked = useSelector(state => state.checkboxReducer.digits.isChecked);
  let bigLettersIsChecked = useSelector(state => state.checkboxReducer.latinLettersBig.isChecked);

  const checkedStates = [
    {
      id: useSelector(state => state.checkboxReducer.digits.id),
      value: digitsValue,
      isChecked: digitIsChecked
    },
    {
      id: useSelector(state => state.checkboxReducer.latinLettersBig.id),
      value: latinLettersBigValue,
      isChecked: bigLettersIsChecked
    },
    {
      id: useSelector(state => state.checkboxReducer.latinLettersSmall.id),
      value: latinLettersSmallValue,
      isChecked: useSelector(state => state.checkboxReducer.latinLettersSmall.isChecked)
    },
    {
      id: useSelector(state => state.checkboxReducer.cyrillicLettersBig.id),
      value: cyrillicLettersBigValue,
      isChecked: useSelector(state => state.checkboxReducer.cyrillicLettersBig.isChecked)
    },
    {
      id: useSelector(state => state.checkboxReducer.cyrillicLettersSmall.id),
      value: cyrillicLettersSmallValue,
      isChecked: useSelector(state => state.checkboxReducer.cyrillicLettersSmall.isChecked)
    }
  ]


  const getCheckValue = (type, event) => {
    dispatch(getCheckboxAction(type));
    const customDictionary = document.getElementById('custom-dictionary');
    let target = checkedStates[event.target.dataset.id-1]

    if (!target.isChecked) {
      customDictionary.value += target.value;
    } else {
      const dict = [...document.querySelectorAll('input[type="checkbox"]')];
      dict.map((element, index) => {
        if (element.checked) {
          restArray.push(checkedStates[element.dataset.id-1].value)
        }
      })
      customDictionary.value = '';
      customDictionary.value = restArray.join('').toString()
      }
    customDictionary.innerText = customDictionary.value
  }


  return (
    <>
      <h3 className="main__form-item-label">
        Словарь:
      </h3>
      <label htmlFor="dict-digit">
        <input type="checkbox" name="dict-digit" value="0-9" id="dict-digit"
               data-id="1"  onChange={(event) => getCheckValue('0-9', event)}/>
          0-9
      </label>
      <label htmlFor="dict-big-letter-l">
        <input type="checkbox" name="dict-big-letter-l" value="A-Z" id="dict-big-letter-l"
               data-id="2" onChange={(event) => getCheckValue('A-Z', event)}/>
         A-Z
      </label>
      <label htmlFor="dict-small-letter-l">
        <input type="checkbox" name="dict-small-letter-l" value="a-z" id="dict-small-letter-l"
               data-id="3" onChange={(event) => getCheckValue('a-z', event)}/>
         a-z
      </label>
      <label htmlFor="dict-big-letter-k">
        <input type="checkbox" name="dict-big-letter-k" value="А-Я" id="dict-big-letter-k"
               data-id="4" onChange={(event) => getCheckValue('А-Я', event)}/>
         А-Я
      </label>
      <label htmlFor="dict-small-letter-k">
        <input type="checkbox" name="dict-small-letter-k" value="а-я" id="dict-small-letter-k"
               data-id="5" onChange={(event) => getCheckValue('а-я', event)}/>
        а-я
      </label>
    </>
  )
}