import React, {useState} from "react";
import {useDispatch} from "react-redux";

export const ElementInputCount = (props) => {
  const dispatch = useDispatch();

  const getValue = (event) => {
    props.checkValidity(event);
    dispatch({type: "SET_COUNT_PROMO", payload: event.target.value})
  }

  return (
    <>
      <label htmlFor="promo-count">
        Количество промокодов:
        <input type="text" id="promo-count" onChange={getValue} />
      </label>
    </>
  )
}