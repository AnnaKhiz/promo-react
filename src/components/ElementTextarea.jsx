import React from "react";

export const ElementTextarea = () => {

  return (
    <>
      <div className="main__form-textarea-block">
        <h3 className="main__form-textarea-label">
          Выбранные словари:
        </h3>
        <textarea className="main__form-textarea" name="custom-dictionary" id="custom-dictionary"/>
      </div>

    </>
  )
}