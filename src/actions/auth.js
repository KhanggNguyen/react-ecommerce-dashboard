import { publicRequest, userRequest } from "../helpers/axios";
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    signupStart,
    signupSuccess,
    signupFailure,
    logoutFailure,
    refreshTokenStart,
    refreshTokenFailure,
    refreshTokenSuccess,
} from "../redux/authRedux";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch(signupStart());
        try {
            const res = await publicRequest.post(`/api/admin/signup`, user);
            
            if (res.status === 201) {
                dispatch(signupSuccess());
            } else {
                const { error } = res.data;
                dispatch(signupFailure(error));
            }
        } catch (err) {
            const { data } = err.response ;
            dispatch(signupFailure({ error: data.message }));
        }
    };
};

export const login = (user) => {
    return async (dispatch) => {
        dispatch(loginStart());
        try {
            const res = await publicRequest.post(`/api/admin/signin`, user);
            if (res.status === 200) {
                dispatch(loginSuccess(res.data));
            } else {
                dispatch(loginFailure(res.data));
            }
        } catch (err) {
            dispatch(loginFailure(err));
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch(logoutStart());

        const res = await userRequest.post(`/api/admin/signout`);

        if (res.status === 200) {
            localStorage.clear();
            dispatch(logoutSuccess());
        } else {
            dispatch(logoutFailure(res.data.error));
        }
    };
};

export const isUserLoggedin = () => {
    return async (dispatch) => {
        try {
            const res = await userRequest.post("/api/admin/isUserLoggedIn");

            if (res.status === 401) {
                dispatch(refreshTokenStart());  
                const res = await userRequest.post("/api/refresh-token");
                if(res.status >= 300){
                    dispatch(refreshTokenFailure(res.data));
                }else{
                    dispatch(refreshTokenSuccess(res.data));
                }
            }
        } catch (err) {
            dispatch(refreshTokenFailure());
        }
    };
};
