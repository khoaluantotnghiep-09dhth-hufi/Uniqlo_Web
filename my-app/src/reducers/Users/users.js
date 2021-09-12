import * as types from "./../../constants/ActionTypes";

var initialState = [];


var users = (state = initialState, action) => {

  switch (action.type) {
// Lấy tất cả danh sách khách hàng
    case types.FETCH_USER:
      state = action.user;
      return [...state];

    default:
      return state;
  }
};

export default users;
