import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (banner, id) => {
  var result = -1;
  banner.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var banner = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách banner
    case types.FETCH_BANNER:
      state = action.banner;

      return [...state];
    //Xóa banner
    case types.DELETE_BANNER:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm banner
    case types.ADD_BANNER:
      console.log(action.banner);
      state.push(action.banner);

      return [...state];
    //Cập Nhật banner
    case types.UPDATE_BANNER:
      index = findIndex(state, action.banner.id);
      if (index !== -1) {
        state[index] = banner;
      }

      return [...state];
    //Lấy banner Để Eddit
    case types.EDIT_BANNER:
      return action.banner;
    default:
      return state;
  }
};

export default banner;
