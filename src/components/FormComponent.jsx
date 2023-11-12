import React, {useState} from "react";
import { ElementInputCount } from './ElementInputCount.jsx';
import { ElementInputPrefix } from './ElementInputPrefix.jsx';
import { ElementInputLength } from './ElementInputLength.jsx';
import { ElementCheckbox } from './ElementCheckbox.jsx';
import { ElementButton } from './ElementButton.jsx';
import { ElementTextarea } from './ElementTextarea.jsx';
import { ErrorBlockComponent } from './ErrorBlockComponent.jsx';
import { CONSTANT } from "../js/constants.js";

export const FormComponent = () => {
  const message = document.getElementById('message');

  const [countValue, setCountValue] = useState('');
  const [prefixValue, setPrefixValue] = useState('');
  const [lengthValue, setLengthValue] = useState('');


  const getInputCount = (value) => {
    setCountValue(value);
    // console.log(countValue)
  }

  const getInputPrefix = (value) => {
    setPrefixValue(value);
    // console.log(prefixValue)
  }

  const getInputLength = (value) => {
    setLengthValue(value);
    // console.log(lengthValue)
  }

  const showFinalCode = () => {

  }



  return (
    <>
      <form action="#" id="form" className="main__form">
        <div className="main__form-container">
          <div className="main__form-container-item">
            <ElementInputCount getInputCount={getInputCount}/>
            <ElementInputPrefix getInputPrefix={getInputPrefix}/>
            <ElementInputLength getInputLength={getInputLength}/>
          </div>
          <div className="main__form-container-item checkbox">
            <ElementCheckbox />
          </div>
          <div className="main__form-container-item">
            <ElementButton />
            <ElementTextarea />
          </div>
          <ErrorBlockComponent />

        </div>
      </form>

    </>
  )
}