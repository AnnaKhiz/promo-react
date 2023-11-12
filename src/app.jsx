import './sass/style.sass';
import React from "react";
// import ReactDOM from 'react-dom';
import { FormComponent } from './components/FormComponent.jsx';
import {useDispatch, useSelector} from 'react-redux';
// import {combineReducers, legacy_createStore as createStore} from "redux";






export const App = () => {

  // store.subscribe(() => {
  //   console.log(`store updated:`, store.getState())
  // })

  return (
    <>
      <FormComponent />
    </>
    )
}

