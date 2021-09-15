import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";

export const fetchNews = (news) => {
    return {
        type: types.FETCH_NEWS,
        news,
    };
};

export const fetchNewsResquest = () => {
    return (dispatch) => {
        return callApi("news", "GET", null).then((response) => {
            dispatch(fetchNews(response.data));
        });
    };
};

export const onAddNews = (news) => {
    return {
        type: types.ADD_NEWS,
        news,
    };
};
export const onAddNewsResquest = (news) => {
    return (dispatch) => {
        return callApi("news", "POST", news).then((response) => {
            dispatch(onAddNews(response.data));
        });
    };
};

export const onUpdateNews = (news) => {
    return {
        type: types.UPDATE_NEWS,
        news,
    };
};
export const onUpdateNewsResquest = (news) => {
    return (dispatch) => {
        return callApi(`news/${news.id}`, "PUT", news).then(
            (response) => {
                dispatch(onUpdateNews(response.data));
            }
        );
    };
};
export const onDeleteNews = (id) => {
    return {
        type: types.DELETE_NEWS,
        id,
    };
};

export const onDeleteNewsResquest = (id) => {
    return (dispatch) => {
        return callApi(`news/${id}`, "DELETE", null).then((response) => {
            dispatch(onDeleteNews(id));
        });
    };
};
export const onGetNew = (news) => {
    return {
      type: types.EDIT_CATEGORY,
      news,
    };
  };
  export const onEditNewsResquest = (id) => {
    return (dispatch) => {
      return callApi(`news/${id}`, "GET", null).then((response) => {
        dispatch(onGetNew(response.data));
      });
    };
  };