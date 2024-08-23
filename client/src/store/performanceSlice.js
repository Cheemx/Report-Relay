import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    performanceData: null
}

const performanceSlice = createSlice({
    name: "performance",
    initialState,
    reducers: {
        create: (state, action) => {
            state.status = true;
            state.performanceData = action.payload.performanceData;
        },
        deletePerformance: (state) => {
            state.status = false;
            state.performanceData = null;
        }
    }
});

export const {create, deletePerformance} = performanceSlice.actions;

export default performanceSlice.reducer