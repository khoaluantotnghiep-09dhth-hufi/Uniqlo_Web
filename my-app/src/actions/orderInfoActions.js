import * as types from "../constants/ActionTypes";
import callApi from "../Admin/utils/Callapi";
import {  toast } from 'react-toastify';
export const fetchOrderInfo = (orderInfo) => {
  return {
    type: types.FETCH_ORDERINFO,
    orderInfo,
  };
};

export const fetchOrderInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders-info/${id}`, "GET", null).then((response) => {
      console.log(response.data);
      dispatch(fetchOrderInfo(response.data));
    });
  };
};
export const onAddOrderInfo = (orderInfo) => {
    return {
      type: types.ADD_ORDERINFO,
      orderInfo,
    };
  };
  
  export const onAddOrderInfoResquest = (orderInfo) => {
    return (dispatch) => {
      return callApi("orders-info", "POST", orderInfo).then((response) => {
        toast.success("Bổ sung thành công !");
        dispatch(onAddOrderInfo(response.data));
      });
    };
  };
  export const onDeleteOrderInfo = (id) => {
    return {
      type: types.DELETE_ORDERINFO,
      id,
    };
  };
  
  export const onDeleteOrderInfoResquest = (id) => {
    return (dispatch) => {
      return callApi(`order-info/${id}`, "DELETE", null).then((response) => {
        toast.success("Xóa thành công !");
        dispatch(onDeleteOrderInfo(id));
      });
    };
  };