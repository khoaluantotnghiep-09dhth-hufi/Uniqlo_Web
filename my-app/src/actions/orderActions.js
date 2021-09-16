import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";


export const fetchOrder = (order) => {
    return {
      type: types.FETCH_ORDER,
      order,
    };
  };
  
  export const fetchOrderResquest = () => {
    return (dispatch) => {
      return callApi("orders", "GET", null).then((response) => {
        dispatch(fetchOrder(response.data));
      });
    };
  };
  
  //Xóa Color
  export const onDeleteOrder = (id) => {
    return {
      type: types.DELETE_ORDER,
      id,
    };
  };
  
  export const onDeleteOrderResquest = (id) => {
    return (dispatch) => {
      return callApi(`orders/${id}`, "DELETE", null).then((response) => {
        dispatch(onDeleteOrder(id));
      });
    };
  };
  //Thêm Color
  export const onAddOrder = (order) => {
    return {
      type: types.ADD_ORDER,
      order,
    };
  };
  
  export const onAddOrderResquest = (order) => {
    return (dispatch) => {
      return callApi("orders", "POST", order).then((response) => {
        dispatch(onAddOrder(response.data));
      });
    };
  };
  //Cập Color
  export const onUpdateOrder = (order) => {
    return {
      type: types.UPDATE_ORDER,
      order,
    };
  };
  export const onUpdateOrderResquest = (order) => {
    return (dispatch) => {
      return callApi(`orders/${order.id}`, "PUT", order).then(
        (response) => {
          dispatch(onUpdateOrder(response.data));
        }
      );
    };
  };
  
  //Sửa Color
  export const onGetOrder = (order) => {
    return {
      type: types.EDIT_ORDER,
      order,
    };
  };
  export const onEditOrderResquest = (id) => {
    return (dispatch) => {
      return callApi(`orders/${id}`, "GET", null).then((response) => {
        dispatch(onGetOrder(response.data));
      });
    };
  };