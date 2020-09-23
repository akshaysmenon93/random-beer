import React from 'react'
import {Grid, Paper, Typography, Divider} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {Link} from "react-router-dom"
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp'
import CancelSharpIcon from '@material-ui/icons/CancelSharp'
import WithLoader from "../common/loader"
import {PropTypes} from 'prop-types'

//add future styles here
const useStyles = makeStyles( ( theme ) => ( {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: '2%'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        [ theme.breakpoints.down( "sm" ) ]: {
            padding: '8px'
        }
    },
    centerText: {
        textAlign: 'center',
        fontWeight: 'bold '
    },
    descriptionPadding: {
        paddingTop: '8px',
        textAlign: 'justify'
    },
    beerName: {
        [ theme.breakpoints.up( "md" ) ]: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    },
    breweryName: {
        textDecoration: 'none'
    },
    beerInfo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    beerPrimary: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    beerSecondary: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        [ theme.breakpoints.down( "sm" ) ]: {
            justifyContent: 'flex-start'
        },
        [ theme.breakpoints.up( "md" ) ]: {
            display: 'flex',
            justifyContent: 'center'
        }
    },
    isOrganic: {
        display: 'flex',
        marginLeft: '16px'
    },
    abv: {
        display: 'flex',
    },
    fillGreen: {
        fill: 'green'
    },
    fillRed: {
        fill: 'red'
    }
} ) )


//presentational component to display the details of the beer. Props are passed in from BeerController
const BeerDetails = ( {beerDetails: {nameDisplay, abv, isOrganic, labels, style, breweries}, onDefaultImage, isLoading, isApiError} ) => {

    const classes = useStyles()

    return (

        <div className={classes.root}>

            <Grid container className={classes.beerPrimary}>

                <Grid item xs={12} sm={6} className={classes.beerName}>
                    <Typography variant="h4">
                        {nameDisplay}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6} className={classes.beerSecondary}>
                    <Typography variant="body2" >
                        ALC. {abv}% BY VOL.
                    </Typography>

                    <Typography className={classes.isOrganic}>
                        {isOrganic ? <CheckCircleSharpIcon className={classes.fillGreen} /> : <CancelSharpIcon className={classes.fillRed} />} Organic
                    </Typography>
                </Grid>

            </Grid>


            <Paper className={classes.paper} elevation={3}>
                <Grid item container spacing={1} >

                    <Grid item xs={12} sm={5}>
                        <div className={classes.image}>
                            <img className={classes.img} onError={onDefaultImage} alt="Failed to load" src={labels.large} />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={7} container className={classes.beerInfo}>

                        <Grid item xs container spacing={2} className={classes.gridBorder}>
                            <Grid item xs={12}>

                                <Typography className={classes.centerText} gutterBottom>
                                    {style.name}
                                </Typography>

                                <Divider />

                                <Typography gutterBottom variant="body2" className={classes.descriptionPadding}>
                                    {style.description}
                                </Typography>

                                <Typography className={classes.descriptionPadding}>
                                    Breweries:
                                </Typography>

                                <Divider />

                                <ul>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {breweries.map( ( record ) => {
                                            return (
                                                <li key={record.id}>
                                                    {/* navigate to brewery controller by passing the id as a url param */}
                                                    <Link to={`/brewery/${ record.id }`} className={classes.breweryName}>
                                                        {record.nameShortDisplay}
                                                    </Link>
                                                </li>
                                            )
                                        } )}
                                    </Typography>
                                </ul>

                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

            </Paper>

        </div >


    )
}

//Types of props passed in, modify if further props are added
BeerDetails.propTypes = {
    beerDetails: PropTypes.shape( {
        nameDisplay: PropTypes.string,
        abv: PropTypes.string,
        isOrganic: PropTypes.string,
        labels: PropTypes.object,
        style: PropTypes.object,
        breweries: PropTypes.array

    } ),
    onDefaultImage: PropTypes.func,
    isLoading: PropTypes.bool,
    isApiError: PropTypes.bool
}

export default WithLoader( BeerDetails )
// the BeerDetails component is wrapped by a higher order component WithLoader.
// This function returns the loading screen if there are any api calls in progress else it returns the component passed to it