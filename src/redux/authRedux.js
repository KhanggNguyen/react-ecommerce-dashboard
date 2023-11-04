import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    currentUser: null,
    authenticated: false,
    isFetching: false,
    error: null,
    message: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.error = false;
            state.message = "";
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
            state.authenticated = true;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.message;
        },
        logoutStart: (state) => {
            state.error = false;
            state.message = "";
            state.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.token = null;
            state.currentUser = null;
            state.authenticated = false;
            state.isFetching = false;
            state.error = false;
            state.message = "";
        },
        logoutFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.message;
        },
        signupStart: (state) => {
            state.error = false;
            state.message = "";
        },
        signupSuccess: () => {},
        signupFailure: (state, action) => {
            console.log(action.payload);
            state.error = true;
            state.message = action.payload.error;
        },
        refreshTokenStart: (state) => {
            state.error = false;
            state.message = "";
            state.isFetching = true;
        },
        refreshTokenSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload.user;
            state.token = action.payload.token;
            state.authenticated = true;
        },
        refreshTokenFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.currentUser = null;
            state.authenticated = false;
            state.message = action.message;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    signupStart,
    signupSuccess,
    signupFailure,
    refreshTokenStart,
    refreshTokenFailure,
    refreshTokenSuccess
} = authSlice.actions;

export default authSlice.reducer;
