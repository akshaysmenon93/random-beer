import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {BrowserRouter as Router} from "react-router-dom"
import configureStore from "./redux/configureStore"
import {Provider as ReduxProvider} from "react-redux"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './style/theme'

const store = configureStore() //initialises the global state in the redux store

//App starts rendering from
ReactDOM.render(

  //make the redux store, custom material ui theme and the router available to the eligible components
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </ReduxProvider>
  ,
  document.getElementById( 'root' )
)


