import {combineReducers} from "redux"
import foodReducer from "./foodReducer"

const rootReducer = combineReducers({
    food:foodReducer
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;