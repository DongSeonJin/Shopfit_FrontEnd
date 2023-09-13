import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "~/store/slices/rootReducer";


const initialState = {};
const store = configureStore({
    devTools: true,
    preloadedState: initialState,
});



export default store;