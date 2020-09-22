import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as breweryActions from '../../redux/actions/breweryActions'
import {useHistory} from "react-router-dom"
import BreweryDetails from "./breweryDetails"
import {makeStyles} from "@material-ui/styles"
import {handleImageError} from "../common/apiUtils"
import {PropTypes} from 'prop-types'

//add all future styles here
const useStyles = makeStyles( ( theme ) => ( {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        [ theme.breakpoints.up( "sm" ) ]: {
            paddingLeft: '54px',
            paddingRight: '54px'
        },
        [ theme.breakpoints.down( "sm" ) ]: {
            paddingLeft: '8px',
            paddingRight: '8px'
        }
    }
} ) )


//logical component to display brewery information 
const BreweryControl = ( {breweryId, breweryDetails, isLoading, isApiError, actions} ) => {

    const classes = useStyles() //initialise styles
    const history = useHistory() //initialise history object, used to navigate pages

    //code inside is executed only once when the component loads
    useEffect( () => {
        if ( breweryId !== breweryDetails.id ) { //if new id matches with the one in the store, no need to call the api again
            actions.breweryActions.getBreweryById( breweryId, "Y" ) //call api to fetch brewery information
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function handleBack () { //on back button click, goes to homepage
        history.push( '/' )
    }

    function websiteRedirect () { //on clicking the image, goes to brewery website
        window.open( breweryDetails.website )
    }

    //returns the presentational component that displays brewery details
    return (
        <div className={classes.root}>
            <BreweryDetails
                breweryDetails={breweryDetails}
                onBack={handleBack}
                onRedirect={websiteRedirect}
                onDefaultImage={handleImageError}
                isApiError={isApiError}
                isLoading={isLoading} />
        </div>

    )
}

function mapStateToProps ( state, ownProps ) {
    const breweryId = ownProps.match.params.breweryId //fetch the brewery id from the url
    return {
        breweryId: breweryId, //map the url param to the component props
        breweryDetails: state.brewery,//fetch the brewery object from the redux store
        isLoading: state.apiCallsInProgress > 0 || state.brewery.length === 0, //to check if any api calls are in progress
        isApiError: state.apiCallsInProgress === -1 //to check if any API calls have thrown errors
    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        actions: {
            breweryActions: bindActionCreators( breweryActions, dispatch ) //binding the (dispatch) brewery actions to the props
        }
    }
}


//types of the props passed in to this component. Modify if new props are added
BreweryControl.propTypes = {
    breweryId: PropTypes.string,
    breweryDetails: PropTypes.oneOfType( [
        PropTypes.object,
        PropTypes.array
    ] ),
    isLoading: PropTypes.bool,
    isApiError: PropTypes.bool,
    actions: PropTypes.object
}

export default connect( mapStateToProps, mapDispatchToProps )( BreweryControl )