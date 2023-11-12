import React from "react";
import {useDispatch} from "react-redux";

export const ElementInputLength= (props) => {

  const dispatch = useDispatch();

  const getValue = (event) => {
    props.checkValidity(event);
    dispatch({type: "SET_STRING_LENGTH", payload: event.target.value})
  }

  return (
    <>
      <label htmlFor="promo-length">
        Общая длина промокода:
        <input type="text" id="promo-length" onChange={getValue}/>
      </label>
    </>
  )
}