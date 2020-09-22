import React from 'react'
import {Grid, Paper, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/styles"
import {PropTypes} from 'prop-types'

//add all future styles here
const useStyles = makeStyles( ( theme ) => ( {
    fallbackParent: {
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackItem: {
        display: 'flex',
        alignItems: 'center'
    },
    fallbackBoxSizing: {
        width: '400px',
        height: '240px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
} ) )

//this is a PRESENTATIONAL component is used for 2 purposes:
// 1. The loading screen 
// 2. The error handling screen (API errors)

const Fallback = ( {display, showReload} ) => {
    const classes = useStyles()


    return (
        <Grid container className={classes.fallbackParent}>
            <Grid item className={classes.fallbackItem} xs={12} >
                <Paper elevation={3} className={classes.fallbackBoxSizing}>

                    <Typography>  {display} </Typography>
                    {/* if showReload is true, it means there is an error.  */}
                    {showReload ? <Typography> Click <a href="/"> here </a> to reload </Typography> : null}


                </Paper>
            </Grid>
        </Grid>
    )
}

///props passed into this component
Fallback.propTypes = {
    display: PropTypes.string,
    showReload: PropTypes.bool
}

export default Fallback