import { put, call, takeEvery } from 'redux-saga/effects';
import {  FETCH_PRODUCTS_REQUEST, fetchProductsSuccess } from '../actions/productActions';
import { setLoader } from "../actions/appActions"; 
import { getSkinCare } from "../../utils/axios-instance";

// worker saga for fetching products
function* fetchProductData() {
  try {
    yield put(setLoader(true)); 
    const response = yield call(getSkinCare); 
    yield put(fetchProductsSuccess(response.data)); 
    yield put(setLoader(false)); 
  } catch (error) {
    console.error("Failed to fetch products", error);
    yield put(setLoader(false)); 
  }
}

// watcher saga for fetching products
export function* watchFetchProductData() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductData);
}
