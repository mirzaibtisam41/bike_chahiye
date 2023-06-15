import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import productSlice from './reducers/productSlice';
import UserSlice from './reducers/user';

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    products: productSlice,
    user: UserSlice
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export const persistor = persistStore(store);