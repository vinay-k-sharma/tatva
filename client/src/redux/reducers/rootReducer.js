import { combineReducers } from "redux";
import { roleReducer } from "./roleReducer";

const rootReducer = combineReducers({
    role:roleReducer,
})
export default rootReducer