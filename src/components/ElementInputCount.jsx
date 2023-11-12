import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getPromoCountAction} from '../actions';

export const ElementInputCount = (props) => {
  const dispatch = useDispatch();

  const getValue = (event) => {
    props.checkValidity(event);
    dispatch(getPromoCountAction(event));
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