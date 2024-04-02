import {all} from 'redux-saga/effects'
import {watchFetchProductData} from './productSaga'

export default function* rootSaga(){
    yield all([
        watchFetchProductData()
    ])
}

//will try to implement fork here for parallel executions. fork saga1, fork saga 2 ...