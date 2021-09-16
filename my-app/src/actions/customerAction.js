import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";

export const fetchCustomer = (customer) => {
    return {
        type: types.FETCH_CUSTOMER,
        customer,
    };
};

export const fetchCustomerResquest = () => {
    return (dispatch) => {
        return callApi("customer", "GET", null).then((response) => {
            dispatch(fetchCustomer(response.data));
        });
    };
};

export const onAddCustomer = (customer) => {
    return {
        type: types.ADD_CUSTOMER,
        customer,
    };
};
export const onAddCustomerResquest = (customer) => {
    return (dispatch) => {
        return callApi("customer", "POST", customer).then((response) => {
            dispatch(onAddCustomer(response.data));
        });
    };
};

export const onUpdateCustomer = (customer) => {
    return {
        type: types.UPDATE_CUSTOMER,
        customer,
    };
};
export const onUpdateCustomerResquest = (customer) => {
    return (dispatch) => {
        return callApi(`customer/${customer.id}`, "PUT", customer).then(
            (response) => {
                dispatch(onUpdateCustomer(response.data));
            }
        );
    };
};
export const onDeleteCustomer = (id) => {
    return {
        type: types.DELETE_CUSTOMER,
        id,
    };
};

export const onDeleteCustomerResquest = (id) => {
    return (dispatch) => {
        return callApi(`customer/${id}`, "DELETE", null).then((response) => {
            dispatch(onDeleteCustomer(id));
        });
    };
};
export const onGetCustomer = (news) => {
    return {
      type: types.EDIT_CUSTOMER,
      news,
    };
  };
  export const onEditCustomerResquest = (id) => {
    return (dispatch) => {
      return callApi(`customer/${id}`, "GET", null).then((response) => {
        dispatch(onGetCustomer(response.data));
      });
    };
  };