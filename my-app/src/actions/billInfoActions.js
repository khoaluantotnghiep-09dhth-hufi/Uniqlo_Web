
import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import {  toast } from 'react-toastify';
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