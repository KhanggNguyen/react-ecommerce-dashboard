import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    isFetching: false,
    error: null,
    message: "",
};

const createNewCategories = (parentId, categories, category) => {
    let newCategories = [];

    //has no parent category
    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: [],
            },
        ];
    }

    for (let cat of categories) {
        //add subcategory for this cat
        if (cat._id === parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: [],
            };

            newCategories.push({
                ...cat,
                children:
                    cat.children.length > 0
                        ? [...cat.children, newCategory]
                        : [newCategory],
            });
        } else {
            newCategories.push({
                ...cat,
                children: cat.children
                    ? createNewCategories(parentId, cat.children, category)
                    : [],
            });
        }
    }

    return newCategories;
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload.categories;
        },
        addCategoryStart: (state) => {
            state.error = false;
            state.message = "";
            state.isFetching = true;
        },
        addCategorySuccess: (state, action) => {
            const category = action.payload.category;
            // const newCategories = createNewCategories(
            //     category.parentId,
            //     state.categories,
            //     category
            // );
            state.isFetching = false;
            // state.categories = newCategories;
        },
        addCategoryFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.message;
        },
        updateCategoryStart: (state) => {
            state.error = false;
            state.message = "";
            state.isFetching = true;
        },
        updateCategorySuccess: (state, action) => {
            state.isFetching = false;
            state.message = action.payload.message;
        },
        updateCategoryFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.message = action.payload.message;
        },
        deleteCategoryStart: (state) => {
            state.isFetching = true;
        },
        deleteCategorySuccess: (state) => {
            state.isFetching = false;
        },
        deleteCategoryFailure: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.message = action.payload.message;
        },
    },
});

export const {
    getCategories,
    addCategoryStart,
    addCategorySuccess,
    addCategoryFailure,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFailure,
    deleteCategoryStart,
    deleteCategorySuccess,
    deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
