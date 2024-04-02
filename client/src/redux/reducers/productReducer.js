import {
    FETCH_PRODUCTS_SUCCESS,
  } from "../actions/productActions";
  
  const initialState = {
    products: [],
  };
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
        };
      default:
        return state;
    }
  };
  