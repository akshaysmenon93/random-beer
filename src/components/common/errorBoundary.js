import React from 'react'
import Fallback from './fallback'


//Component to handle exceptions thrown by any child component wrapped by this component
class AppErrorBoundary extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            hasError: false,
            error: null,
            info: null
        }
    }

    //react lifecycle method that catches the exception and updates the state
    static getDerivedStateFromError ( error ) {
        return {error: error}
    }

    //react lifecycle method to log the exceptions thrown. Custom logger can be added here
    componentDidCatch ( error, info ) {
        console.log( "Error stack trace : " + info.componentStack )
    }

    //renders the fallback component if any exceptions were thrown, else returns the child components as it is
    render () {
        if ( this.state.error ) {
            return (

                <>
                    <Fallback display="Ooops ! Something went wrong ! " showReload={true} />

                    <span>The error: {this.state.error.toString()}. </span>  <span> Check the console for more info</span>

                </>

            )
        }
        return this.props.children
    }
}

export default AppErrorBoundary