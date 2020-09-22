import {combineReducers} from 'redux'
import {beerReducer as beer} from "./beerReducer"
import {breweryReducer as brewery} from "./breweryReducer"
import {apiStatusReducer as apiCallsInProgress} from './apiStatusReducer'

const rootReducer = combineReducers( {beer, brewery, apiCallsInProgress} )

export default rootReducer

//file to combine all the reducers
//names used in the combineReducers function will be the name of the correspoding state variables in the redux store