import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (category, id) => {
  var rs = -1;
  category.forEach((item, index) => {
    if (item.id === id) {
      rs = index;
    }
  });
  return rs;
}
var category = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Danh Mục
    case types.FETCH_CATEGORY:
      state = action.category;

      return [...state];
    case types.DELETE_CATEGORY:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case types.ADD_CATEGORY:

      state.push(action.category);
      return [...state];
    case types.UPDATE_CATEGORY:
      index = findIndex(state, action.category.id);
      if (index !== -1) {
        state[index] = category;
      }
      return [...state];
    case types.EDIT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

export default category;
