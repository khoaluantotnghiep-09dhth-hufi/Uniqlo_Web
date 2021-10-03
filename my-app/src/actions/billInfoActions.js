
import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import { toast } from 'react-toastify';
export const fetchBillInfoExchange = (billInfoExchange) => {
  return {
    type: types.FETCH_BILLINFOEXCHANGE,
    billInfoExchange,
  }
}

export const fetchBillInfoExchangeResquest = () => {
  return (dispatch) => {
    return callApi("exchange-bill-info", "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchBillInfoExchange(response.data));
      }
    });
  };
};

export const fetchBillToTal = (billTotal) => {
  return {
    type: types.FETCH_BILL_TOTAL,
    billTotal,
  }
}

export const fetchBillTotalResquest = () => {
  return (dispatch) => {
    return callApi("bills-total", "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchBillToTal(response.data));
      }
    });
  };
};

export const fetchBillToTalQuantity = (billTotalQuantity) => {
  return {
    type: types.COUNT_TOTALQUANTITY,
    billTotalQuantity,
  }
}

export const fetchBillTotalQuantityResquest = () => {
  return (dispatch) => {
    return callApi("bills-total-quantity", "GET", null).then((response) => {
      if (response === undefined) {
        toast.error("Vui lòng thử lại !");
      }
      else {
        dispatch(fetchBillToTalQuantity(response.data));
      }
    });
  };
};

export const onUpdateBillInfo = (billInfo) => {
  return {
    type: types.UPDATE_BILLINFO,
    billInfo,
  };
};
export const onUpdateBillInfoResquest = (billInfo) => {
  return (dispatch) => {
    return callApi(`/bill-info-exchange/${billInfo.id}`, "PUT", billInfo).then((response) => {
      if (response === undefined) {
        toast.error("Sửa thất bại, vui lòng thử lại !");
      }
      else {
        toast.success("Sửa thành công !");
        dispatch(onUpdateBillInfo(response.data));
      }
    }
    );
  };
};