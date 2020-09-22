import axios from 'axios'
import {LOAD_RANDOM_BEER_SUCCESS, LOAD_BEER_DETAILS_SUCCESS, CLEAR_CURRENT_BEER} from './actionTypes'
import {beginApiCall, endApiCall, apiError} from "./apiStatusActions"


const corsUrl = `${ process.env.REACT_APP_CORS_HEADER }`
const baseUrl = `${ process.env.REACT_APP_BREWERY_DB_API }`
const key = `${ process.env.REACT_APP_KEY }`


//function to call the API and fetch a random beer
export function getRandomBeer ( withBreweries, hasLabels ) {
    const url = corsUrl + baseUrl + "/beer/random?withBreweries=" + withBreweries
        + "&hasLabels=" + hasLabels + "&key=" + key

    return async ( dispatch ) => {

        dispatch( beginApiCall() ) //dispatches begin api call action, updates the apiCallsInProgress in the redux store

        function onSuccess ( response ) {
            dispatch( {type: LOAD_RANDOM_BEER_SUCCESS, payload: response.data} ) //dispatches load success, reducer updates the beer object in the redux store
            return response.data.data
        }

        function onError ( error ) {
            dispatch( endApiCall() ) //to end api call
            dispatch( apiError() ) //updates redux store to display the fall back error component
        }

        try {
            const response = await axios.get( url ) //calling the API
            return onSuccess( response )
        } catch ( error ) {
            return onError( error )
        }

    }
}

//function to fetch extra beer information including label images
export function getBeerLabel ( beerId ) {
    const url = corsUrl + baseUrl + "/beer/" + beerId + "?key=" + key

    return async ( dispatch ) => {


        function onSuccess ( beerLabelInfo ) {
            dispatch( {type: LOAD_BEER_DETAILS_SUCCESS, payload: beerLabelInfo.data} )
            dispatch( endApiCall() )
        }

        function onError ( error ) {
            dispatch( endApiCall() )
            dispatch( apiError() )
        }

        try {
            const beerLabelInfo = await axios.get( url )
            return onSuccess( beerLabelInfo )
        } catch ( error ) {
            return onError( error )
        }
    }
}

export function clearCurrentBeer () {
    return ( dispatch ) => {
        dispatch( {type: CLEAR_CURRENT_BEER} ) //action clears the beer object in redux state, triggering the useEffect hook in BeerController
    }
}