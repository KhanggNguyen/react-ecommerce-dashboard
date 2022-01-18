import { userRequest } from "../helpers/axios";
import { getCategories, addCategoryFailure, addCategoryStart, addCategorySuccess, deleteCategoryFailure, deleteCategoryStart, deleteCategorySuccess, updateCategoryFailure, updateCategoryStart, updateCategorySuccess } from '../redux/categoryRedux';

export const getAllCategory = () => {
    return async (dispatch) => {
        const res = await userRequest.get(`/api/category/`);
        
        if(res.status === 200){
            dispatch(getCategories(res.data));
        }
    }
}

export const addCategory = (form) => {
    return async (dispatch) => {
        dispatch(addCategoryStart());
        const res = await userRequest.post(`/api/category/create`, form);

        if(res.status === 201){
            dispatch(addCategorySuccess(res.data));
        }else{
            dispatch(addCategoryFailure(res.data.error));
        }
    }
}

export const updateCategory = (form) => {
    return async (dispatch) => {
        dispatch(updateCategoryStart());

        const res = await userRequest.post(`/api/category/update`, form);

        if(res.status === 201){
            dispatch(updateCategorySuccess(res.data));
            dispatch(getAllCategory());
        }else{
            dispatch(updateCategoryFailure(res.data.error));
        }
    }
}

export const deleteCategory = (idCategory) => {
    return async (dispatch) => {
        dispatch(deleteCategoryStart());
        const res = await userRequest.post(`/api/category/delete`, {
            payload: {
                _id: idCategory
            }
        });

        if(res.status === 201){
            dispatch(getAllCategory());
            dispatch(deleteCategorySuccess());
        }else{
            dispatch(deleteCategoryFailure(res.data.error));
        }
    }
}