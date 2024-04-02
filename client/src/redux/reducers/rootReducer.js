import { combineReducers } from "redux";
import { roleReducer } from "./roleReducer";
import { productReducer } from "./productReducer";
import { appReducer } from "./appReducer";

const rootReducer = combineReducers({
    role:roleReducer,
    product: productReducer,
    app:appReducer
})
export default rootReducer