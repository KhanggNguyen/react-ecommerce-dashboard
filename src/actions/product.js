import { userRequest, publicRequest } from "../helpers/axios";

import {
    getProducts,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    updateProducStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
} from "../redux/productRedux";

export const getAllProduct = () => {
    return async (dispatch) => {
        const res = await userRequest.get(`/api/product/`);

        if (res.status === 200) {
            dispatch(getProducts(res.data));
        }
    };
};

export const getProductsByCategory = (categoryId) => {
    return async (dispatch) => {
        const res = await userRequest.get(`/api/product?categoryId=${categoryId}`);

        if (res.status === 200) {
            dispatch(getProducts(res.data));
        }
    };
};

export const addProduct = (form) => {
    return async (dispatch) => {
        dispatch(addProductStart());

        const res = await userRequest.post(`/api/admin/product`, form);
        if (res.status === 201) {
            dispatch(addProductSuccess());
            dispatch(getAllProduct());
        } else {
            dispatch(addProductFailure(res.data.error));
        }
    };
};

export const updateProduct = (form) => {
    return async (dispatch) => {
        dispatch(updateProducStart());

        const res = await userRequest.post(`/api/product/update`, form);

        if (res.status === 201) {
            dispatch(updateProductSuccess());
            dispatch(getAllProduct());
        } else {
            dispatch(updateProductFailure(res.data.error));
        }
    };
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        const res = await userRequest.post(`/api/product/deleteProductById`, {
            payload: {
                _id: id,
            },
        });
        
        dispatch(deleteProductStart());
        if (res.status === 202) {
            dispatch(deleteProductSuccess());
            dispatch(getAllProduct());
        } else {
            dispatch(deleteProductFailure(res.data.error));
        }
    };
};
