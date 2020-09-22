import axios from 'axios'
import {LOAD_BREWERY_SUCCESS} from './actionTypes'
import {beginApiCall, endApiCall, apiError} from "./apiStatusActions"

const corsUrl = `${ process.env.REACT_APP_CORS_HEADER }`
const baseUrl = `${ process.env.REACT_APP_BREWERY_DB_API }`
const key = `${ process.env.REACT_APP_KEY }`

//function to fetch brewery details
export function getBreweryById ( breweryId, withLocations ) {
    const url = corsUrl + baseUrl + "/brewery/" + breweryId + "?withLocations=" + withLocations + "&key=" + key

    return async ( dispatch ) => {

        dispatch( beginApiCall() )

        function onSuccess ( response ) {
            dispatch( {type: LOAD_BREWERY_SUCCESS, payload: response.data} ) //updates the brewery state in the redux store
            dispatch( endApiCall() )
            return response.data.data
        }

        function onError ( error ) {
            dispatch( endApiCall() )
            dispatch( apiError() )
        }

        try {
            const response = await axios.get( url )
            return onSuccess( response )
        } catch ( error ) {
            return onError( error )
        }

    }
}