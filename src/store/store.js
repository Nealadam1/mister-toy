import { combineReducers, createStore } from "redux"
import { reviewReducer } from "./reducers/review.reducer"
import { toyReducer } from "./reducers/toy.reducer"
import { userReducer } from "./reducers/user.reducer"




const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer
})

export const store = createStore(rootReducer, middleware)

// For debug 
store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})
