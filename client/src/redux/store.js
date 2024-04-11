import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import {composeWithDevTools} from 'redux-devtools-extension'
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
    // Specify the reducers you want to persist
    whitelist: ['cart','product'], // In this example, we persist the 'user' reducer
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
const store  = createStore(persistedReducer,composeWithDevTools((applyMiddleware(sagaMiddleware))))
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default store;
