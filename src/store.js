//importando librerias de redux
import { createStore, applyMiddleware, compose } from 'redux'

// impotando libreria de redux-thunk
import thunk from 'redux-thunk'

// importando los reducers
import rootReducers from './reducers/'

// state initial
const initialState ={}

// creando el middleware
const middleware = [thunk]

// creando el store
const store = createStore(rootReducers, initialState, compose( applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store