import React from 'react'
import BeerControl from './beer/BeerController'
import {CssBaseline} from "@material-ui/core"
import {Route, Switch} from 'react-router-dom'
import BreweryControl from './brewery/breweryController'


function App () {
  return (
    <>

      <CssBaseline />

      <Switch>
        <Route exact path="/" component={BeerControl} />
        <Route exact path="/brewery/:breweryId" component={BreweryControl} />
      </Switch>

    </>
  )
}

export default App

//CssBaseline normalizes styles and corrects browser inconsistencies
//Switch statement renders the component according to the path specified. Add all future routes(components) within the switch statement