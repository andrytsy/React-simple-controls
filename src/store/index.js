import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducers'
import API from '../middlewares/api'
import sessionStore from '../middlewares/sessionStorage'

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose


const enhancer = composeEnhancers(applyMiddleware(API, sessionStore))
const store = createStore(reducer, enhancer)

// dev only 
window.store = store

export default store