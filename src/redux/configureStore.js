import {createStore, applyMiddleware, compose} from "redux"
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'

export default function configureStore ( initialState ) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose //adds support for redux devtools

    return createStore( rootReducer,
        initialState,
        composeEnhancers( applyMiddleware( thunk ) ) )

}

//redux store configuration