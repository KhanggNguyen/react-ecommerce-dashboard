import { userRequest } from "../helpers/axios";

import {
    getCustomerOrdersStart,
    getCustomerOrdersSuccess,
    getCustomerOrdersFailure,
    updateCustomerOrderStart,
    updateCustomerOrderSuccess,
    updateCustomerOrderFailure
} from "../redux/orderRedux";

export const getAllOrders = () => {
    return async (dispatch) => {
        dispatch(getCustomerOrdersStart());

        const res = await userRequest.post("/api/admin/order/all");

        if (res.status === 200) {
            const { orders } = res.data;

            dispatch(getCustomerOrdersSuccess({ orders }));
        } else {
            const { error } = res.data;
            dispatch(getCustomerOrdersFailure({ error }));
        }
    };
};

export const updateOrder = (payload) => {
    return async (dispatch) => {
        dispatch(updateCustomerOrderStart());

        const res = await userRequest.post("/api/admin/order/update", payload);

        if(res.status === 201){
            dispatch(updateCustomerOrderSuccess());
            dispatch(getAllOrders());
        }else{
            const {error} = res.data;
            dispatch(updateCustomerOrderFailure({error}));
        }
    }
}