import {combineReducers, legacy_createStore as createStore} from "redux";
import {checkboxReducer, textareaReducer, stringDataReducer} from './reducers'

const rootReducers = combineReducers({
  checkboxReducer,
  textareaReducer,
  stringDataReducer
})

export default createStore(rootReducers);

