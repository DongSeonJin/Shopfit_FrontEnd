import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "../redux/rootReducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authUser'] // 유저만 persist됨. 
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    preloadedState: initialState,
});



export default store;