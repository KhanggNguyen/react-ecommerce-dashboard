import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userDetail: null,
    isFetching : false,
    error: false,
    message: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        getUserSuccess: (state, action) => {
            state.isFetching = false;
            console.log(action.payload);
            state.users = action.payload.users;
        },
        getUserFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        getUserDetailStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        getUserDetailSuccess: (state, action) => {
            state.isFetching = false;
            state.userDetail = action.payload;
        },
        getUserDetailFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        },
        updateUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.message = "";
        },
        updateUserSuccess: (state) => {
            state.isFetching = false;
        },
        updateUserFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.error;
        }
    }
});

export const {
    getUsersStart,
    getUserSuccess,
    getUserFailure,
    getUserDetailStart,
    getUserDetailSuccess,
    getUserDetailFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} = userSlice.actions;

export default userSlice.reducer;