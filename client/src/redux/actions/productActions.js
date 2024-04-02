export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

 // aciton for passing the resukt after request
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// action for requesting the fetching of the products
export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});
