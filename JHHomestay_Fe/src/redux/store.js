import { createStore, combineReducers,applyMiddleware } from "redux"

import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer, homestayReducer,  } from "./reducers"

const rootReducer = combineReducers({authReducer, homestayReducer})


export const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware()
        // other store enhancers if any
      ))

