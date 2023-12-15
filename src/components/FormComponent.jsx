import React, {useEffect} from "react";
import { backToPortfolio } from "../js/back.js";
import { ElementInputCount } from './ElementInputCount.jsx';
import { ElementInputPrefix } from './ElementInputPrefix.jsx';
import { ElementInputLength } from './ElementInputLength.jsx';
import { ElementCheckbox } from './ElementCheckbox.jsx';
import { ElementButton } from './ElementButton.jsx';
import { ElementTextarea } from './ElementTextarea.jsx';
import { ErrorBlockComponent } from './ErrorBlockComponent.jsx';
import { CONSTANT } from "../js/constants.js";

export const FormComponent = () => {

  useEffect(backToPortfolio, [])

  const checkValidity = (event) => {

    const message = document.getElementById('message');
    const element = event.target;
    element.addEventListener('keyup', (e) => {
      element.value = element.value.replace(CONSTANT.REGEX_DIGITS, '');
    })
    element.addEventListener('blur', (e) => {
      if (element.value.replaceAll(' ','') === '') {
        message.innerText = 'Заполните все поля!';
      } else {
        message.innerText = '';
      }
    });
  }

  return (
    <>
      <div className="button-back" id="button-back"></div>
      <form action="#" id="form" className="main__form ">
        <div className="main__form-container" >
          <div className="main__form-container-item">
            <ElementInputCount  checkValidity={checkValidity}/>
            <ElementInputPrefix />
            <ElementInputLength checkValidity={checkValidity} />
          </div>
          <div className="main__form-container-item checkbox">
            <ElementCheckbox />
            <ElementTextarea />
          </div>
          <div className="main__form-container-item button">
            <ElementButton />

          </div>
          <ErrorBlockComponent />
        </div>
      </form>
    </>
  )
}