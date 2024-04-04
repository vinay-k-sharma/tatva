import { combineReducers } from "redux";
import { roleReducer } from "./roleReducer";
import { productReducer } from "./productReducer";
import { appReducer } from "./appReducer";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
    role:roleReducer,
    product: productReducer,
    app:appReducer,
    cart:cartReducer
})
export default rootReducer