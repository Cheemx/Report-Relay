import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import performanceSlice from "./performanceSlice";

const store = configureStore({
    reducer:{
        auth : authSlice,
        performance : performanceSlice
    }
});

export default store