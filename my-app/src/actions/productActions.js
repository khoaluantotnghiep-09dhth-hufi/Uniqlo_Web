import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";

export const fetchProduct = (products) => {
    return {
      type: types.FETCH_PRODUCT,
      products,
    };
  };
  
  export const fetchProductResquest = () => {
    return (dispatch) => {
      return callApi("products", "GET", null).then((response) => {
        dispatch(fetchProduct(response.data));
      });
    };
  };