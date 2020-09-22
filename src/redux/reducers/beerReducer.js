import {
    LOAD_RANDOM_BEER_SUCCESS,
    LOAD_BEER_DETAILS_SUCCESS, CLEAR_CURRENT_BEER
} from '../actions/actionTypes'
import initialState from './initialState'


export function beerReducer ( state = initialState.beerDetails, action ) {
    switch ( action.type ) {
        case LOAD_RANDOM_BEER_SUCCESS:
            return action.payload.data
        case LOAD_BEER_DETAILS_SUCCESS:
            const mergedData = Object.assign( {}, state, {labels: action.payload.data.labels, isOrganic: action.payload.data.isOrganic} )
            return mergedData
        case CLEAR_CURRENT_BEER:
            return []
        default:
            return state
    }
}

//reducer to maintain the state of beer details in the redux store
