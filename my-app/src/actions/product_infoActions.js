import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
export const onAddProductInfo = (productInfo) => {
    return {
      type: types.ADD_PRODCUTINFO,
      productInfo,
    };
  };
  
  export const onAddProductInfoResquest = (productInfo) => {
    return (dispatch) => {
      return callApi("product-info", "POST", productInfo).then((response) => {
        dispatch(onAddProductInfo(response.data));
      });
    };
  };