import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isFetching: false,
    error: null,
    message: "",
};

const productSlice = createSlice({
    name: 'product',
    initialState, 
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload.products;
        },
        addProductStart: (state) => {
            state.error = null;
            state.message = "";
            state.isFetching = true;
        },
        addProductSuccess: (state) => {
            state.isFetching = false;
        },
        addProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        updateProducStart: (state) => {
            state.error = null;
            state.message = "";
            state.isFetching = true;
        },
        updateProductSuccess: (state) => {
            state.isFetching = false;
        },
        updateProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = '';
        },
        deleteProductSuccess: (state) => {
            state.isFetching = false;
        },
        deleteProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        }
    }
});

export const {
    getProducts,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    updateProducStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure
} = productSlice.actions;

export default productSlice.reducer;