
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
      dispatch(fetchBillInfoExchange(response.data));
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
    return callApi(`/bill-info-exchange/${billInfo.id}`, "PUT", billInfo).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateBillInfo(response.data));
      }
    );
  };
};