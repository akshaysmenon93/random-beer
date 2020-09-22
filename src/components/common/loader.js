import React from 'react'
import Fallback from "./fallback"
import {PropTypes} from 'prop-types'


//A higher order component that : 
// 1. Returns loading screen if isLoading is true and isApiError is false
// 2. Returns the error screen if isApiError is true
// 3. Returns the component passed to it if both isLoading and isApiError is false

const WithLoader = WrappedComponent => {
    return class FallbackScreen extends React.PureComponent {
        render () {
            if ( this.props.isLoading && !this.props.isApiError ) {
                return <Fallback display="Loading..." showReload={false} />
            }

            if ( this.props.isApiError ) {
                return <Fallback display="Ooops ! Something went wrong ! " showReload={true} />
            }

            return <WrappedComponent {...this.props} />
        }
    }
}

//props received by this component
WithLoader.propTypes = {
    WrappedComponent: PropTypes.instanceOf( React.Component )
}

export default WithLoader