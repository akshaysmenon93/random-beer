import React from 'react'
import {makeStyles} from "@material-ui/styles"
import {
    Grid, Paper, Typography, Button, Divider,
    ButtonBase, List, ListItem, ListItemIcon, ListItemText
} from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp'
import WithLoader from '../common/loader'
import {PropTypes} from 'prop-types'
import {applicationText} from "../common/constants"

//add all future styles here
const useStyles = makeStyles( ( theme ) => ( {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: '2%',
        [ theme.breakpoints.up( "sm" ) ]: {
            paddingLeft: '54px',
            paddingRight: '54px'
        }
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
    breweryName: {
        textAlign: 'center',
        paddingTop: '8px',
        display: 'flex',
        [ theme.breakpoints.down( "sm" ) ]: {
            flexDirection: 'column-reverse'
        }
    },
    breweryDescription: {
        paddingTop: '16px',
        textAlign: 'justify',
        [ theme.breakpoints.down( "sm" ) ]: {
            padding: '24px !important'
        }
    },
    mainTitle: {
        flexGrow: '1',
        fontWeight: 'bold'
    },
    established: {
        float: "left"
    },
    backButton: {
        width: '100%'
    },
    locations: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    locationItem: {
        paddingLeft: '0px',
        paddingRight: '0px',
        overflow: 'hidden'
    },
    locationContainer: {
        display: 'flex'
    }
} ) )


//presentational component to display the brewery details
const BreweryDetails = ( {breweryDetails: {images, established, name, description, locations},
    onBack, onRedirect, onDefaultImage, isApiError, isLoading} ) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <div className={classes.backButton}>
                <Button color="primary" startIcon={<ArrowBackIcon />} onClick={onBack}>{applicationText.backButtonText}</Button>
            </div>

            <Paper className={classes.paper} elevation={3}>
                <Grid item container>

                    <Grid item id="childimageGrid" xs={12} sm={5} className={classes.image}>

                        <ButtonBase onClick={onRedirect}>
                            <img className={classes.img} alt="Failed to load" onError={onDefaultImage} src={images.large} />
                        </ButtonBase>

                    </Grid>

                    <Grid item sm container className={classes.breweryContent}>

                        <Grid item xs container spacing={2}>

                            <Grid item xs={12}>

                                <Typography className={classes.breweryName} gutterBottom>
                                    <span>{applicationText.establishedText} {established}</span>
                                    <span className={classes.mainTitle}>{name}</span>
                                </Typography>

                                <Divider />

                                <div className={classes.breweryDescription}>
                                    <Typography gutterBottom variant="body2">
                                        {description}
                                    </Typography>
                                </div>

                            </Grid>

                            <Grid item container xs={12}>

                                <List className={classes.locations} dense={true}>
                                    {locations.map( ( record ) => {
                                        return (
                                            <Grid xs={12} sm={6} item key={record.id} className={classes.locationContainer}>
                                                <ListItem className={classes.locationItem}>
                                                    <ListItemIcon>
                                                        <LocationOnSharpIcon />
                                                    </ListItemIcon>

                                                    <ListItemText
                                                        primary={record.name}
                                                        secondary={record.streetAddress + ',' + record.locality + ',' + record.region}
                                                    />

                                                </ListItem>
                                            </Grid>
                                        )
                                    } )

                                    }
                                </List>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>

    )
}

//types of the props received by this component. Make changes if future props are added
BreweryDetails.propTypes = {
    breweryDetails: PropTypes.shape( {
        images: PropTypes.object,
        established: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        locations: PropTypes.array
    } ),
    onBack: PropTypes.func,
    onRedirect: PropTypes.func,
    onDefaultImage: PropTypes.func,
    isApiError: PropTypes.bool,
    isLoading: PropTypes.bool
}

export default WithLoader( BreweryDetails )
// the BreweryDetails component is wrapped by a higher order component WithLoader.
// This function returns the loading screen if there are any api calls in progress else it returns the component passed to it