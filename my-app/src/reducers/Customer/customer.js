import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (customer, id) => {
  var rs = -1;
  customer.forEach((customer, index) => {
    if (customer.id === id) {
      rs = index;

    }
  });
  return rs;
}
var customer = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {

    case types.FETCH_CUSTOMER:
      state = action.customer;
      return [...state];
    case types.DELETE_CUSTOMER:
      index = findIndex(state, id);
      state.slice(index, 1);
      return [...state];
    case types.ADD_CUSTOMER:
      state.push(action.customer);
      return [...state];
    case types.UPDATE_CUSTOMER:
      index = findIndex(state, action.customer.id);
      if (index !== -1) {
        state[index] = customer;
      }
      return [...state];
    case types.EDIT_CUSTOMER:
      return action.customer;
    default:
      return state;
  }
};

export default object;
