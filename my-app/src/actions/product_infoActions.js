import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import {  toast } from 'react-toastify';
export const fetchProductInfo = (productInfo) => {
  return {
    type: types.FETCH_PRODCUTINFO,
    productInfo,
  };
};

export const fetchProductInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`product-info/${id}`, "GET", null).then((response) => {
      console.log(response.data);
      dispatch(fetchProductInfo(response.data));
    });
  };
};
export const fetchProductInfoNoID = (productInfo) => {
  return {
    type: types.FETCH_PRODCUTINFO,
    productInfo,
  };
};

export const fetchProductInfoResquestNoID = () => {
  return (dispatch) => {
    return callApi("product-info", "GET", null).then((response) => {
      console.log(response.data);
      dispatch(fetchProductInfoNoID(response.data));
    });
  };
};
export const onAddProductInfo = (productInfo) => {
    return {
      type: types.ADD_PRODUCTINFO,
      productInfo,
    };
  };
  
  export const onAddProductInfoResquest = (productInfo) => {
    return (dispatch) => {
      return callApi("product-info", "POST", productInfo).then((response) => {
        toast.success("Bổ sung thành công !");
        dispatch(onAddProductInfo(response.data));
      });
    };
  };
  export const onDeleteProductInfo = (id) => {
    return {
      type: types.DELETE_PRODUCTINFO,
      id,
    };
  };
  
  export const onDeleteProductInfoResquest = (id) => {
    return (dispatch) => {
      return callApi(`product-info/${id}`, "DELETE", null).then((response) => {
        toast.success("Xóa thành công !");
        dispatch(onDeleteProductInfo(id));
      });
    };
  };