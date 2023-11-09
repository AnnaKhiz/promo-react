import '../sass/style.sass';
import { json2csv } from 'json-2-csv';

const count = document.getElementById('promo-count');
const prefix = document.getElementById('promo-prefix');
const length = document.getElementById('promo-length');
const dict = [...document.querySelectorAll('input[type="checkbox"]')];
const customDictionary = document.getElementById('custom-dictionary');
const form = document.getElementById('form');
const message = document.getElementById('message');
const regexDigits = new RegExp('[A-Za-zА-Яа-я\\W\_]','g');
const digits = '0123456789';
const lettersLatin = 'abcdefghijklmnopqrstuvwxyz';
const lettersKirillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const titleName = 'promocode';
const maxPromoLength = 16;
let finalLength = 0;
let dictArray = [];
let finalCodeArray = [];
let promoGeneral = 0;
let promoPrefix = '';
let jsonArray = [];
let customArray = [];
let checked = [];

checkSymbols(count, regexDigits);
checkSymbols(length, regexDigits);
createCustomDictionary();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (count.value.replaceAll(' ','') != '' || length.value.replaceAll(' ','') != '') {
        message.innerText = '';
        if (checkCountLength(count) && checkPrefixLength(prefix, length) && checkGeneralCodeLength(length)) {
            dictArray = customDictionary.value.toString().replaceAll(' ','');
            function memorize () {
                const checkedDict = dictArray;
                const memo = {};

                finalCodeArray = generateRandomStringArray(promoGeneral, finalLength, memo, checkedDict);
                finalCodeArray.forEach((element) => {
                  jsonArray.push(JSON.parse(`{"${titleName}":"${element}"}`));
                })

            }

            memorize();

            async function generateJSONFile() {
                let res = await json2csv(jsonArray);
                if (res.length !== 0 || res.length >= titleName.length) {
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
})


function checkSymbols(elem, reg) {
    elem.addEventListener('keyup', (e) => {
        elem.value = elem.value.replace(reg, '');
    })
}

function checkCountLength(count) {
    let countChecked = count.value.replaceAll(' ','');

    if (countChecked < Number.MAX_SAFE_INTEGER) {
        message.innerText = '';
        promoGeneral = +countChecked;
        return true;
    } else {
        message.innerText = 'Слишком большое количество промо-кодов или пустое поле.';
        return false;
    }
}

function checkPrefixLength(prefix, length) {
    let prefixChecked = prefix.value.replaceAll(' ','');
    let lengthChecked = length.value.replaceAll(' ','');

    if (prefixChecked.length < lengthChecked || prefixChecked.length === lengthChecked) {
        message.innerText = '';
        promoPrefix = prefixChecked;
        return true;
    } else {
        message.innerText = 'Длина префикса должна быть меньше чем общая длина промо-кода';
        return false;
    }
}

function checkGeneralCodeLength(length) {
    let lengthChecked = length.value.replaceAll(' ','');
    let prefixChecked = prefix.value.replaceAll(' ','');

    if (lengthChecked <= maxPromoLength && lengthChecked != '') {
        message.innerText = '';
        finalLength = lengthChecked - prefixChecked.length;
        return true;
    } else {
        message.innerText = `Рекомендуемая длина промо-кода не более ${maxPromoLength} символов (с учетом  длины префикса)`
        return false;
    }
}

function getCheckedDictionary(check, target) {
  switch (check) {
    case '0-9':
      customArray.push({id: target, dictionary: digits});
      break;
    case 'A-Z':
      customArray.push({id: target, dictionary: lettersLatin.toUpperCase()})
      break;
    case 'a-z':
      customArray.push({id: target, dictionary: lettersLatin.toLowerCase()});
      break;
    case 'А-Я':
      customArray.push({id: target, dictionary: lettersKirillic.toUpperCase()});
      break;
    case 'а-я':
      customArray.push({id: target, dictionary: lettersKirillic.toLowerCase()});
      break;
  }
    return customArray;
}


function createCustomDictionary() {
  dict.forEach((check) => {
    customArray = [];

    check.addEventListener('change', (event) => {
      let target = event.target.dataset.id;

      if (check.checked) {
        getCheckedDictionary(check.value, target);
        addDictionaryInTextfield(target);
      } else {
        customDictionary.innerText = '';
        removeDictionaryFromTextfield(target);
      }
    })
  })
}



function generateRandomPromo(length, checkedDict) {
    let randomString = promoPrefix;
    for (let i = 0; i < length; i++) {
        randomString += checkedDict[Math.floor(Math.random() * checkedDict.length)];
    }
    return randomString;
}

function createJSONArray(randomStringsArray, length, stringLength, checkedDict) {
  let str;
    while (randomStringsArray.size < length) {
        str = generateRandomPromo(stringLength, checkedDict);
        randomStringsArray.add(str.toString());
    }
    return randomStringsArray;
}

function generateRandomStringArray(length, stringLength, memo, checkedDict) {
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

function downloadFile(res, filename) {
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

function addDictionaryInTextfield(target) {
  customArray.forEach((elem, ind) => {
    if (target === elem.id) {
      customDictionary.value += elem.dictionary;
    }
    customDictionary.innerText = customDictionary.value;
  })
}

function removeDictionaryFromTextfield(target) {
  customArray.forEach((element, i) => {
    if (target === element.id) {
      customArray.splice(i,1);
      customDictionary.value = '';
      customArray.forEach((obj) => {
        customDictionary.value = customDictionary.value + obj.dictionary;
      });
      return customArray;
    }
  })
}