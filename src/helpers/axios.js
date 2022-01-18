import axios from "axios";
import { store } from "../redux/store";
import { logoutSuccess } from "../redux/authRedux";

const BASE_URL = process.env.REACT_APP_API_URL;
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const auth = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const token = auth && JSON.parse(auth).token;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
});

userRequest.interceptors.request.use((req) => {
    const { auth } = store.getState();
    if (auth.token) {
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});

userRequest.interceptors.response.use(
    (res) => {
        console.log(res);
        return res;
    },
    (error) => {
        console.log(error);
        const { status } = error.response;
        if (status === 500) {
            localStorage.clear();
            store.dispatch(logoutSuccess());
        }
        return Promise.reject(error);
    }
);
