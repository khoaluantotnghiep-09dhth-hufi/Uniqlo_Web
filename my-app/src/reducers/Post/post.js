import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (post, id) => {
  var result = -1;
  post.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var post = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Mau
    case types.FETCH_POST:

      state = action.post;

      return [...state];
    //Xóa Mau
    case types.DELETE_POST:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Mau
    case types.ADD_POST:
      console.log(action.post);
      state.push(action.post);

      return [...state];
    //Cập Nhật Mau
    case types.UPDATE_POST:
      
      index = findIndex(state, action.post.id);
      if (index !== -1) {
        state[index] = action.post;
      }

      return [...state];
   
    default:
      return state;
  }
};

export default post;
