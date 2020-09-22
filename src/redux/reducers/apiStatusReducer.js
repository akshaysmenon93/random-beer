import {BEGIN_API_CALL, END_API_CALL, API_CALL_ERROR} from '../actions/actionTypes'
import initialState from './initialState'


export function apiStatusReducer ( state = initialState.apiCallsInProgress, action ) {
    switch ( action.type ) {
        case BEGIN_API_CALL:
            return state + 1
        case END_API_CALL:
            return state - 1
        case API_CALL_ERROR:
            return -1
        default:
            return state
    }
}

//reducer to maintain the state of api calls in progress. 
