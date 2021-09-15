import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (promotion, id) => {
  var result = -1;
  promotion.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var promotion = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Khuyen Mai
    case types.FETCH_PROMOTION:
      state = action.promotion;

      return [...state];
    //Xóa Khuyen Mai
    case types.DELETE_PROMOTION:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Khuyen Mai
    case types.ADD_PROMOTION:
      state.push(action.promotion);

      return [...state];
    //Cập Nhật Khuyen Mai
    case types.UPDATE_PROMOTION:
      index = findIndex(state, action.promotion.idItem);
      if (index !== -1) {
        state[index] = promotion;
      }

      return [...state];
    case types.EDIT_PROMOTION:
      return action.promotion;
    default:
      return state;
  }
};

export default promotion;
