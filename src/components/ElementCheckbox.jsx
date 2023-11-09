import React from "react";

export const ElementCheckbox = () => {
  return (
    <>
      <h3 className="main__form-item-label">
        Словарь:
      </h3>
      <label htmlFor="dict-digit">
        <input type="checkbox" name="dict-digit" value="0-9" id="dict-digit" data-id="1"/>
          0-9
      </label>
      <label htmlFor="dict-big-letter-l">
        <input type="checkbox" name="dict-big-letter-l" value="A-Z" id="dict-big-letter-l" data-id="2"/>
         A-Z
      </label>
      <label for="dict-small-letter-l">
        <input type="checkbox" name="dict-small-letter-l" value="a-z" id="dict-small-letter-l" data-id="3" />
         a-z
      </label>
      <label htmlFor="dict-big-letter-k">
        <input type="checkbox" name="dict-big-letter-k" value="А-Я" id="dict-big-letter-k" data-id="4"/>
         А-Я
      </label>
      <label htmlFor="dict-small-letter-k">
        <input type="checkbox" name="dict-small-letter-k" value="а-я" id="dict-small-letter-k" data-id="5"/>
      </label>
    </>
  )
}