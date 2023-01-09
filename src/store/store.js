import { combineReducers, legacy_createStore } from "redux"




const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    // appModule: appReducer,
    // carModule: carReducer,
    // userModule: userReducer
})

export const store = legacy_createStore(rootReducer, middleware)

// For debug 
store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})
