import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import * as beerActions from '../../redux/actions/beerActions'
import Header from './Header'
import {Grid} from "@material-ui/core"
import BeerDetails from './BeerDetails'
import {makeStyles} from "@material-ui/styles"
import {handleImageError} from "../common/apiUtils"
import {PropTypes} from 'prop-types'


//add all new classes here (uses makeStyles hook provided my Material-UI)
const useStyles = makeStyles( ( theme ) => ( {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    beerInfo: {
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

//The logical component for displaying a random beer
const BeerControl = ( {currentBeer, isLoading, isApiError, actions} ) => {

    const classes = useStyles() //initialize all the classes

    //executed when the component is mounted
    //If the 'currentBeer' prop is modified, the code inside is executed again (modified when user clicks the BEER ME! button)
    useEffect( () => {
        if ( currentBeer.length === 0 ) {
            actions.beerActions.getRandomBeer( "Y", "Y" ).then( beerInfo => {
                actions.beerActions.getBeerLabel( beerInfo.id )
            } )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ currentBeer ] ) //currentBeer is added as a dependency. When its value changes, useEffectHook is executed

    //function to call api and fetch a random beer object
    function loadRandomBeer () {
        actions.beerActions.clearCurrentBeer() //dispatches action to clear the current beer, triggering useEffectHook
    }


    //Renders presentational component
    //Required information is passed as props to the BeerDetails presentational component
    return (

        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Header handleRandomBeer={loadRandomBeer} isLoading={isLoading} />
                </Grid>
                <Grid item container className={classes.beerInfo}>
                    <Grid item xs>
                        <BeerDetails
                            beerDetails={currentBeer}
                            onDefaultImage={handleImageError}
                            isLoading={isLoading}
                            isApiError={isApiError} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

//to make the redux store available to the component
function mapStateToProps ( state ) {
    return {
        currentBeer: state.beer, //from the redux store
        isLoading: ( state.apiCallsInProgress > 0 || state.beer.length === 0 ), //to check if there are any active api calls are in progress
        isApiError: state.apiCallsInProgress < 0 //to check if any of the API's called have thrown an error
    }
}

//to make the dispatch actions available to the component
function mapDispatchToProps ( dispatch ) {
    return {
        actions: {
            beerActions: bindActionCreators( beerActions, dispatch ) //binding the (dispatch) beer actions to the props
        }
    }
}

//listing all the types of props that are passed in to the component. If any more are added, make changes here
BeerControl.propTypes = {
    currentBeer: PropTypes.oneOfType( [
        PropTypes.object,
        PropTypes.array
    ] ),
    isLoading: PropTypes.bool,
    isApiError: PropTypes.bool,
    actions: PropTypes.object
}

export default connect( mapStateToProps, mapDispatchToProps )( BeerControl )

