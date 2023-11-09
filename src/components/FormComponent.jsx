import React from "react";
import { ElementInputCount } from './ElementInputCount.jsx';
import { ElementInputPrefix } from './ElementInputPrefix.jsx';
import { ElementInputLength } from './ElementInputLength.jsx';
import { ElementCheckbox } from './ElementCheckbox.jsx';
import { ElementButton } from './ElementButton.jsx';
import { ElementTextarea } from './ElementTextarea.jsx';
import { ErrorBlockComponent } from './ErrorBlockComponent.jsx';

export const FormComponent = () => {
  return (
    <>
      <form action="#" id="form" className="main__form">
        <div className="main__form-container">
          <div className="main__form-container-item">
            <ElementInputCount />
            <ElementInputPrefix />
            <ElementInputLength />
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