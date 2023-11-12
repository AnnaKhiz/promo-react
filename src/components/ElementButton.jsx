import React from "react";
import {CONSTANT} from "../js/constants";
import {useDispatch, useSelector} from "react-redux";
import store from "../store";
import { json2csv } from 'json-2-csv';

export const ElementButton = (props) => {

  const dispatch = useDispatch();
  const checkbox09 = useSelector(state => state.checkboxReducer.digits.isChecked)
  const checkboxAZ = useSelector(state => state.checkboxReducer.latinLettersBig.isChecked)
  const checkboxaz = useSelector(state => state.checkboxReducer.latinLettersSmall.isChecked)
  const checkboxAZCyr = useSelector(state => state.checkboxReducer.cyrillicLettersBig.isChecked)
  const checkboxazCyr = useSelector(state => state.checkboxReducer.cyrillicLettersSmall.isChecked)
  const checkedArr = [checkbox09, checkboxAZ, checkboxaz, checkboxAZCyr, checkboxazCyr];
  // console.log(checkedArr)

  const message = document.getElementById('message');
  const count = useSelector(store => store.stringDataReducer.countPromo);
  // console.log(count)
  const prefix = useSelector(store => store.stringDataReducer.stringPrefix);
  // console.log(prefix)
  const length = useSelector(store => store.stringDataReducer.stringLength);
  // console.log(length)
  const countElement = document.getElementById('promo-count');
  const lengthElement = document.getElementById('promo-length');
  let promoGeneral = 0;
  let finalLength = 0;
  let promoPrefix = '';
  let dictArray = [useSelector(store => store.textareaReducer.value)];
  let finalCodeArray = []
  let jsonArray = [];

  // const digitsValue = useSelector(state => state.digits.value);
  // const latinLettersBigValue = useSelector(state => state.latinLettersBig.value);
  // const latinLettersSmallValue = useSelector(store => store.latinLettersSmall.value);
  // const cyrillicLettersBigValue = useSelector(store => store.cyrillicLettersBig.value);
  // const cyrillicLettersSmallValue = useSelector(store => store.cyrillicLettersSmall.value);

  const checkSymbols = (elem, reg) => {
    // console.log(elem)

    elem.toString().addEventListener('keyup', (e) => {
      elem.value = elem.value.replace(reg, '');
    })
  }

  const checkCountLength = (count) => {
    let countChecked = count.replaceAll(' ','');

    if (countChecked < Number.MAX_SAFE_INTEGER) {
      message.innerText = '';
      promoGeneral = +countChecked;
      return true;
    } else {
      message.innerText = 'Слишком большое количество промо-кодов или пустое поле.';
      return false;
    }
  }

  const checkPrefixLength = (prefix, length) => {
    let prefixChecked = prefix.replaceAll(' ','');
    let lengthChecked = length.replaceAll(' ','');

    if (prefixChecked.length < lengthChecked || prefixChecked.length === lengthChecked) {
      message.innerText = '';
      promoPrefix = prefixChecked;
      return true;
    } else {
      message.innerText = 'Длина префикса должна быть меньше чем общая длина промо-кода';
      return false;
    }
  }

  const checkGeneralCodeLength = (length, prefix) => {
    let lengthChecked = length.replaceAll(' ','');
    let prefixChecked = prefix.replaceAll(' ','');

    if (lengthChecked <= CONSTANT.MAX_PROMO_LENGTH && lengthChecked !== '') {
      message.innerText = '';
      finalLength = lengthChecked - prefixChecked.length;
      return true;
    } else {
      message.innerText = `Рекомендуемая длина промо-кода не более ${CONSTANT.MAX_PROMO_LENGTH} символов (с учетом  длины префикса)`;
      return false;
    }
  }

  const getCustonDictionaryValue = () => {
    const customDictionary = document.getElementById('custom-dictionary');
    console.log(customDictionary.value);
    dispatch({type: "GET_CUSTOM_DICT", payload: customDictionary.value})
  }

  const generateRandomPromo = (length, checkedDict) => {
    let randomString = promoPrefix;
    for (let i = 0; i < length; i++) {
      randomString += checkedDict[Math.floor(Math.random() * checkedDict.length)];
    }
    return randomString;
  }


  const createJSONArray = (randomStringsArray, length, stringLength, checkedDict) => {
    let str;
    while (randomStringsArray.size < length) {
      str = generateRandomPromo(stringLength, checkedDict);
      randomStringsArray.add(str.toString());
    }
    return randomStringsArray;
  }

  const generateRandomStringArray = (length, stringLength, memo, checkedDict) => {
    const memoKey = `${length}-${stringLength}`;
    if (memo[memoKey]) {
      return memo[memoKey];
    }

    if (length > Math.pow(checkedDict.length, stringLength)) {
      message.innerText = "Невозможно сгенерировать. Выберите больше вариантов из списка словарей.";
      return [];
    } else {
      message.innerText = '';
      const randomStringsArray = new Set();
      createJSONArray(randomStringsArray, length, stringLength, checkedDict);
      const result = Array.from(randomStringsArray);
      memo[memoKey] = result;
      return result;
    }
  }

  const downloadFile = (res, filename) => {
    const newElemDownload = document.createElement('a');
    newElemDownload.setAttribute('href', `data:text/csv;charset=utf-8,${res}`);
    newElemDownload.setAttribute('download', filename);
    newElemDownload.style.display = 'none';
    document.body.appendChild(newElemDownload);
    newElemDownload.click();
    document.body.removeChild(newElemDownload);

    console.log(finalCodeArray)
    finalCodeArray = [];
    console.log(finalCodeArray)
  }


  // const textareaValue = useSelector(store => store.textareaReducer.value)
  // console.log(textareaValue)

  const form = document.getElementById('form');

  const mainFunctionSubmit = () => {
    const customDictionary = document.getElementById('custom-dictionary');

    // form.addEventListener('submit', (e) => {
      console.log(`button clicked`)
      // e.preventDefault();
      if (countElement.value.replaceAll(' ','') !== '' || lengthElement.value.replaceAll(' ','') !== '') {
        message.innerText = '';
        if (checkCountLength(count) && checkPrefixLength(prefix, length) && checkGeneralCodeLength(length, prefix)) {
          dictArray = customDictionary.value.toString().replaceAll(' ','');
          console.log(`dictArray` + dictArray)
          function memorize () {
            const checkedDict = dictArray;
            const memo = {};

            finalCodeArray = generateRandomStringArray(promoGeneral, finalLength, memo, checkedDict);
            finalCodeArray.forEach((element) => {
              jsonArray.push(JSON.parse(`{"${CONSTANT.TITLE_NAME}":"${element}"}`));
            })

          }

          memorize();

          async function generateJSONFile() {
            let res = await json2csv(jsonArray);
            if (res.length !== 0 || res.length >= CONSTANT.TITLE_NAME.length) {
              downloadFile(res, `promo${promoPrefix}.csv`);
              jsonArray = [];
            }

            return res;
          }

          if (jsonArray.length !== 0) {
            generateJSONFile();
          }
        }
      } else {
        message.innerText = 'Заполните пустые поля';
      }

    // })
  }


  const showResult = (event) => {
    event.preventDefault();
    // checkSymbols(count, CONSTANT.REGEX_DIGITS);
    // checkSymbols(length, CONSTANT.REGEX_DIGITS);

    getCustonDictionaryValue()
    mainFunctionSubmit()

    console.log(finalLength)
  }

  return (
    <>
      <button className="main__form-btn" type="submit" id="btn-submit" onClick={showResult}>
        Export to CSV
      </button>
    </>
  )
}