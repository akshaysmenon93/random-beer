import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {Button, Grid} from "@material-ui/core"
import {applicationText} from "../common/constants"
import {PropTypes} from 'prop-types'

//add all future styles here
const useStyles = makeStyles( ( theme ) => ( {
    toolbar: {
        minHeight: 100,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [ theme.breakpoints.down( "sm" ) ]: {
            padding: '8px'
        }
    }
} ) )

//presentational component to display the header. Props are passed in from BeerController
const Header = ( {handleRandomBeer, isLoading} ) => {
    const classes = useStyles()

    return (

        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Grid item container>

                    <Grid item xs={12} sm={7} className={classes.title} >
                        <Typography variant="h5">
                            {applicationText.title}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={5} className={classes.title}>
                        <Button size="large" variant="contained" color="secondary" disabled={isLoading} onClick={handleRandomBeer}>{applicationText.mainButtonText}</Button>
                    </Grid>

                    <Grid item xs={false} sm={1} />
                </Grid>
            </Toolbar>
        </AppBar>


    )
}

Header.propTypes = {
    handleRandomBeer: PropTypes.func,
    isLoading: PropTypes.bool
}

export default Header