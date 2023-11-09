import { userRequest } from "../helpers/axios";

import {
    getUsersStart,
    getUserSuccess,
    getUserFailure,
    getUserDetailStart,
    updateUserStart,
    updateUserSuccess,
} from "../redux/userRedux";

export const getAllUser = () => {
    return async (dispatch) => {
        dispatch(getUsersStart());

        const res = await userRequest.get("/api/admin/user");

        if (res.status === 200) {
            dispatch(getUserSuccess(res.data));
        }
    };
};

export const getUserDetailById = (_id) => {
    return async (dispatch) => {
        dispatch(getUserDetailStart());

        const res = await userRequest.post("/api/user/getUserbyId", { _id });
        
        if (res.status === 200) {
            dispatch(getUserSuccess(res.data));
        }
        if (res.status === 500) {
            dispatch(getUserFailure(res.data));
        }
    };
};

export const updateUser = (form) => {
    return async (dispatch) => {
        dispatch(updateUserStart());
        
        const res = await userRequest.post("/api/admin/user/update", form);

        if (res.status === 201) {
            dispatch(updateUserSuccess());
            dispatch(getAllUser());
        }

        if (res.status === 500) {
            dispatch(getUserFailure(res.data));
        }
    };
};
