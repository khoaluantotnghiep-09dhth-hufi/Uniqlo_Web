import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
export const fetchObjects = (object) => {
    return {
      type: types.FETCH_OBJECT,
      object,
    };
  };
  
  export const fetchObjectsResquest = () => {
    return (dispatch) => {
      return callApi("objects", "GET", null).then((response) => {
        dispatch(fetchObjects(response.data));
      });
    };
  };
  
  //Xóa objects
  export const onDeleteObjects = (id) => {
    return {
      type: types.DELETE_OBJECT,
      id,
    };
  };
  
  export const onDeleteObjectsResquest = (id) => {
    return (dispatch) => {
      return callApi(`objects/${id}`, "DELETE", null).then((response) => {
        dispatch(onDeleteObjects(id));
      });
    };
  };
  //Thêm objects
  export const onAddObjects = (object) => {
    return {
      type: types.ADD_OBJECT,
      object,
    };
  };
  
  export const onAddObjectsResquest = (object) => {
    return (dispatch) => {
      return callApi("objects", "POST", object).then((response) => {
        console.log(response);
        dispatch(onAddObjects(response.data));
      });
    };
  };
  //Cập objects
  export const onUpdateObjects = (object) => {
    return {
      type: types.UPDATE_OBJECT,
      object,
    };
  };
  export const onUpdateObjectsResquest = (object) => {
    return (dispatch) => {
      return callApi(`objects/${object.id}`, "PUT", object).then(
        (response) => {
          dispatch(onUpdateObjects(response.data));
        }
      );
    };
  };
  
  //Sửa objects
  export const onGetObjects = (object) => {
    return {
      type: types.EDIT_OBJECT,
      object,
    };
  };
  export const onEditObjectsResquest = (id) => {
    return (dispatch) => {
      return callApi(`objects/${id}`, "GET", null).then((response) => {
        dispatch(onGetObjects(response.data));
      });
    };
  };