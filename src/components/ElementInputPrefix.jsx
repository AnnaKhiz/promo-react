import React from 'react';
import {useDispatch} from 'react-redux';
import {getStringPrefixAction} from '../actions';

export const ElementInputPrefix= (props) => {

  const dispatch = useDispatch();

  const getValue = (event) => {
    dispatch(getStringPrefixAction(event));
  }

  return (
    <>
      <label htmlFor='promo-prefix'>
        Префикс к промокоду:
        <input type='text' id='promo-prefix' onChange={getValue}/>
      </label>
    </>
  )
}