import {LOAD_BREWERY_SUCCESS} from '../actions/actionTypes'

export function breweryReducer ( state = [], action ) {
    switch ( action.type ) {
        case LOAD_BREWERY_SUCCESS:
            return action.payload.data
        default:
            return state
    }
}

//reducer to maintain the state of brewery details in the redux store