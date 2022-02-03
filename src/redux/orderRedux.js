import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFetching: false,
    orders: [],
    error: false,
    message: "",
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        getCustomerOrdersStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        getCustomerOrdersSuccess: (state, action) => {
            state.isFetching = false;
            state.orders = action.payload.orders;
        },
        getCustomerOrdersFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        updateCustomerOrderStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        updateCustomerOrderSuccess: (state) => {
            state.isFetching = false;
        },
        updateCustomerOrderFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
    },
});

export const {
    getCustomerOrdersStart,
    getCustomerOrdersSuccess,
    getCustomerOrdersFailure,
    updateCustomerOrderStart,
    updateCustomerOrderSuccess,
    updateCustomerOrderFailure
} = orderSlice.actions;

export default orderSlice.reducer;
