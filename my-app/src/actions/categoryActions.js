import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";

export const fetchCategory = (category) => {
    return {
        type: types.FETCH_CATEGORY,
        category,
    };
};

export const fetchCategoryResquest = () => {
    return (dispatch) => {
        return callApi("categories", "GET", null).then((response) => {
            dispatch(fetchCategory(response.data));
        });
    };
};

export const onAddCategory = (category) => {
    return {
        type: types.ADD_CATEGORY,
        category,
    };
};
export const onAddCategoryResquest = (category) => {
    return (dispatch) => {
        return callApi("categories", "POST", category).then((response) => {
            dispatch(onAddCategory(response.data));
        });
    };
};

export const onUpdateCategory = (category) => {
    return {
        type: types.UPDATE_CATEGORY,
        category,
    };
};
export const onUpdateCategoryResquest = (category) => {
    return (dispatch) => {
        return callApi(`categories/${category.id}`, "PUT", category).then(
            (response) => {
                dispatch(onUpdateCategory(response.data));
            }
        );
    };
};
export const onDeleteCategory = (id) => {
    return {
        type: types.DELETE_CATEGORY,
        id,
    };
};

export const onDeleteCategoryResquest = (id) => {
    return (dispatch) => {
        return callApi(`categories/${id}`, "DELETE", null).then((response) => {
            dispatch(onDeleteCategory(id));
        });
    };
};
export const onGetCategory = (category) => {
    return {
      type: types.EDIT_CATEGORY,
      category,
    };
  };
  export const onEditCategoryResquest = (id) => {
    return (dispatch) => {
      return callApi(`categories/${id}`, "GET", null).then((response) => {
        dispatch(onGetCategory(response.data));
      });
    };
  };