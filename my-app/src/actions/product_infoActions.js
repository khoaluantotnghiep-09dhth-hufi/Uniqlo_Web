import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import { toast } from 'react-toastify';
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
export const fetchProductInfoImport = (productInfo) => {
  return {
    type: types.FETCH_PRODCUTINFO,
    productInfo,
  };
};
export const fetchProductInfoImportResquest = (id) => {
  return (dispatch) => {
    return callApi(`product-info-order-info/${id}`, "GET", null).then((response) => {
      dispatch(fetchProductInfoImport(response.data));
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
export const onUpdateProductInfo = (productInfo) => {
  return {
    type: types.UPDATE_PRODUCTINFO,
    productInfo,
  };
};
export const onUpdateProductInfoResquest = (productInfo) => {
  return (dispatch) => {
    return callApi(`product-info/${productInfo.idItem}`, "PUT", productInfo).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateProductInfo(response.data));
      }
    );
  };
};
export const onUpdateProductInfoImport = (productInfo) => {
  return {
    type: types.UPDATE_PRODUCTINFO,
    productInfo,
  };
};
export const onUpdateProductInfoImportResquest = (productInfo) => {
  return (dispatch) => {
    return callApi(`product-info-import/${productInfo.id}`, "PUT", productInfo).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateProductInfoImport(response.data));
      }
    );
  };
};

//Sửa sản phẩm
export const onGetProductInfo = (productInfo) => {
  return {
    type: types.EDIT_PRODUCTINFO,
    productInfo,
  };
};
export const onEditProductResquest = (id) => {
  return (dispatch) => {
    return callApi(`product-info2/${id}`, "GET", null).then((response) => {
      dispatch(onGetProductInfo(response.data));
    });
  };
};