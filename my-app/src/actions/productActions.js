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
  
  //Xóa Sản Phẩm
  export const onDeleteProduct = (id) => {
    return {
      type: types.DELETE_PRODUCT,
      id,
    };
  };
  
  export const onDeleteProductResquest = (id) => {
    return (dispatch) => {
      return callApi(`products/${id}`, "DELETE", null).then((response) => {
        dispatch(onDeleteProduct(id));
      });
    };
  };
  //Thêm sản phẩm
  export const onAddProduct = (product) => {
    return {
      type: types.ADD_PRODUCT,
      product,
    };
  };
  
  export const onAddProductResquest = (product) => {
    return (dispatch) => {
      return callApi("products", "POST", product).then((response) => {
        dispatch(onAddProduct(response.data));
      });
    };
  };
  //Cập nhật sản phẩm
  export const onUpdateProduct = (product) => {
    return {
      type: types.UPDATE_PRODUCT,
      product,
    };
  };
  export const onUpdateProductResquest = (product) => {
    return (dispatch) => {
      return callApi(`products/${product.id}`, "PUT", product).then(
        (response) => {
          dispatch(onUpdateProduct(response.data));
        }
      );
    };
  };
  
  //Sửa sản phẩm
  export const onGetProduct = (product) => {
    return {
      type: types.EDIT_PRODUCT,
      product,
    };
  };
  export const onEditProductResquest = (id) => {
    return (dispatch) => {
      return callApi(`products/${id}`, "GET", null).then((response) => {
        dispatch(onGetProduct(response.data));
      });
    };
  };