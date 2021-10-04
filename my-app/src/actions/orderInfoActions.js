import * as types from "../constants/ActionTypes";
import callApi from "../Admin/utils/Callapi";
import { toast } from 'react-toastify';
export const fetchOrderInfo = (orderInfo) => {
  return {
    type: types.FETCH_ORDERINFO,
    orderInfo,
  };
};

export const fetchOrderInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders-info/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchOrderInfo(response.data));
      }
    });
  };
};

export const fetchOrderInfoCountQuantity = (orderInfo) => {
  return {
    type: types.COUNT_QUANTITYORDERINFO,
    orderInfo,
  };
};

export const fetchOrderInfoCountQuantityResquest = () => {
  return (dispatch) => {
    return callApi("order-info-count", "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchOrderInfoCountQuantity(response.data));
      }
    });
  };
};

// to import
export const fetchOrderInfoToImport = (orderInfo) => {
  return {
    type: types.FETCH_ORDERINFO,
    orderInfo,
  };
};

export const fetchOrderInfoToImportResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders-info-import/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchOrderInfoToImport(response.data));
      }
    });
  };
};
// to import
export const fetchOrderInfoQuantity = (orderInfo) => {
  return {
    type: types.FETCH_ORDERINFO,
    orderInfo,
  };
};

export const fetchOrderInfoQuantityResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders-info-quantity/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchOrderInfoQuantity(response.data));
      }
    });
  };
};
export const fetchOrderInfoNoID = (orderInfo) => {
  return {
    type: types.FETCH_ORDERINFO,
    orderInfo,
  };
};

export const fetchOrderInfoResquestNoID = () => {
  return (dispatch) => {
    return callApi("orders-info", "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchOrderInfo(response.data));
      }
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
      if (response === undefined) {
        toast.error("Thêm thất bại, vui lòng thử lại !");
      }
      else {
        toast.success("Bổ sung thành công !");
        dispatch(onAddOrderInfo(response.data));
      }
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
    return callApi(`orders-info/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteOrderInfo(id));
    });
  };
};

export const onUpdateOrderInfo = (orderInfo) => {
  return {
    type: types.UPDATE_ORDERINFO,
    orderInfo,
  };
};
export const onUpdateOrderInfoResquest = (orderInfo) => {
  return (dispatch) => {
    return callApi(`orders-info/${orderInfo.id}`, "PUT", orderInfo).then(
      (response) => {
        if (response === undefined) {
          toast.error("Sửa thất bại, vui lòng thử lại !");
        }
        else {
          toast.success("Sửa thành công !");
          dispatch(onUpdateOrderInfo(response.data));
        }
      }
    );
  };
};

export const onGetOrderInfo = (orderInfo) => {
  return {
    type: types.EDIT_ORDERINFO,
    orderInfo,
  };
};
export const onEditOrderInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders-info/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(onGetOrderInfo(response.data));
      }
    });
  };
};