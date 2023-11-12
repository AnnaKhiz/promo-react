import React from "react";
import {useDispatch} from "react-redux";
import {getStringLengthAction} from '../actions';

export const ElementInputLength= (props) => {
  const dispatch = useDispatch();

  const getValue = (event) => {
    props.checkValidity(event);
    dispatch(getStringLengthAction(event));
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