import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import { toast } from 'react-toastify';
export const fetchExchange = (exchange) => {
  return {
    type: types.FETCH_EXCHANGE,
    exchange,
  }
}

export const fetchExchangeResquest = () => {
  return (dispatch) => {
    return callApi("exchange", "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchExchange(response.data));
      }
    });
  };
};

export const onAddExchange = (exchange) => {
  return {
    type: types.ADD_EXCHANGE,
    exchange,
  };
};

export const onAddExchangeResquest = (exchange) => {
  return (dispatch) => {
    return callApi("exchange", "POST", exchange).then((response) => {
      if (response === undefined) {
        toast.error("Thêm thất bại, vui lòng thử lại !");
      }
      else {
        toast.success("Thêm thành công !");
        dispatch(onAddExchange(response.data));
      }
    });
  };
};
//Cập nhật sản phẩm
export const onUpdateExchange = (exchange) => {
  return {
    type: types.UPDATE_EXCHANGE,
    exchange,
  };
};
export const onUpdateExchangeResquest = (exchange) => {
  return (dispatch) => {
    return callApi(`exchange/${exchange.id}`, "PUT", exchange).then(
      (response) => {
        if (response === undefined) {
          toast.error("Sửa thất bại, vui lòng thử lại !");
        }
        else {
          toast.success("Sửa thành công !");
          dispatch(onUpdateExchange(response.data));
        }
      }
    );
  };
};

//Sửa sản phẩm
export const onGetExchange = (exchange) => {
  return {
    type: types.EDIT_EXCHANGE,
    exchange,
  };
};
export const onEditExchangeResquest = (id) => {
  return (dispatch) => {
    return callApi(`exchange/${id}`, "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
      dispatch(onGetExchange(response.data));
      }
    });
  };
};
export const onDeleteExchange = (id) => {
  return {
    type: types.DELETE_EXCHANGE,
    id,
  };
};

export const onDeleteExchangeResquest = (id) => {
  return (dispatch) => {
    return callApi(`exchange/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteExchange(id));
    });
  };
};
