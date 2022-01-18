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
} from "../redux/authRedux";

export const signup = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch(signupStart());
        try {
            const res = await publicRequest.post(`/api/admin/signup`, user);
            
            if (res.status === 201) {
                dispatch(signupSuccess());
            } else {
                const { error } = res.data;
                console.log(res);
                dispatch(signupFailure(error));
            }
        } catch (err) {
            console.log(err.response);
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
                dispatch(loginFailure(res.data.error));
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
        const auth = JSON.parse(localStorage.getItem("persist:root"))?.auth;
        const token = auth && JSON.parse(auth).token;

        if (token) {
            const user = auth && JSON.parse(auth).currentUser;
            dispatch(
                loginSuccess({
                    token: token,
                    user: user,
                })
            );
        }
    };
};
