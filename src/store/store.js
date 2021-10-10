import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";


import { launchDataReducer } from "./reducers/LaunchDataReducer";

const  rootReducer = combineReducers({
    launchData: launchDataReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk));
