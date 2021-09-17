import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
export const fetchOrderInfo = (orderInfo) => {
    return {
      type: types.FETCH_ORDERINFO,
      orderInfo,
    };
  };
  
  export const fetchOrderInfoResquest = (orderInfo) => {
    return (dispatch) => {
      return callApi(`orders-info/${orderInfo.id_order}`, "GET", null).then((response) => {
        dispatch(fetchOrderInfo(response.data));
      });
    };
  };