import React from "react";
import {useDispatch} from "react-redux";

export const ElementInputPrefix= (props) => {
  const dispatch = useDispatch();

  const getValue = (event) => {
    props.getInputPrefix(event.target.value);
    dispatch({type: "SET_STRING_PREFIX", payload: event.target.value})
  }

  return (
    <>
      <label htmlFor="promo-prefix">
        Префикс к промокоду:
        <input type="text" id="promo-prefix" onChange={getValue}/>
      </label>
    </>
  )
}