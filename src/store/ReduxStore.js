import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../redux/rootReducer";


const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState: initialState,
});



export default store;