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
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchProductInfo(response.data));
      }
    });
  };
};

export const fetchCountProductInfo = (productInfo) => {
  return {
    type: types.COUNT_PRODUCTADMIN,
    productInfo,
  };
};

export const fetchCountProductInfoResquest = () => {
  return (dispatch) => {
    return callApi("product-info-count", "GET", null).then((response) => {
      dispatch(fetchCountProductInfo(response.data));
    });
  };
};

export const fetchCountProductStatusInfo = (countproduct) => {
  return {
    type: types.COUNT_STATUS_PRODUCT_EQUAL1,
    countproduct,
  };
};

export const fetchCountProductInfoStatusResquest = () => {
  return (dispatch) => {
    return callApi("count-status-product", "GET", null).then((response) => {
      dispatch(fetchCountProductStatusInfo(response.data));
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
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchProductInfoImport(response.data));
      }
    });
  };
};

export const fetchProductInfoExchange = (productInfo) => {
  return {
    type: types.FETCH_PRODCUTINFO,
    productInfo,
  };
};
export const fetchProductInfoExchangeResquest = (id) => {
  return (dispatch) => {
    return callApi(`exchange-product-info/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchProductInfoExchange(response.data));
      }
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
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchProductInfoNoID(response.data));
      }
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
      if (response === undefined) {
        toast.error("Thêm thất bại, vui lòng thử lại !");
      }
      else {
        toast.success("Bổ sung thành công !");
        dispatch(onAddProductInfo(response.data));
      }
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
        if (response === undefined) {
          toast.error("Sửa thất bại, vui lòng thử lại !");
        }
        else {
          toast.success("Sửa thành công !");
          dispatch(onUpdateProductInfo(response.data));
        }
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
        if (response === undefined) {
          toast.error("Sửa thất bại, vui lòng thử lại !");
        }
        else {
          toast.success("Sửa thành công !");
          dispatch(onUpdateProductInfoImport(response.data));
        }
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
export const onEditProductInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`product-info2/${id}`, "GET", null).then((response) => {
      dispatch(onGetProductInfo(response.data));
    });
  };
};