import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {BrowserRouter as Router} from "react-router-dom"
import configureStore from "./redux/configureStore"
import {Provider as ReduxProvider} from "react-redux"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './style/theme'
import AppErrorBoundary from './components/common/errorBoundary'

const store = configureStore() //initialises the global state in the redux store

//App starts rendering from
ReactDOM.render(

  //make the redux store, custom material ui theme and the router available to the eligible components
  //added an error boundary to catch unexpected API errors, displays a fall back UI for user to reload
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      </Router>
    </ThemeProvider>
  </ReduxProvider>
  ,
  document.getElementById( 'root' )
)


