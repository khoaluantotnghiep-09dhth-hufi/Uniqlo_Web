import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (news, id) => {
  var rs = -1;
  news.forEach((item, index) => {
    if (item.id === id) {
      rs = index;
    }
  });
  return rs;
}
var news = (state = initialState, action) => {
  var index = -1;
  var { id, new1 } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Danh Mục
    case types.FETCH_NEWS:
      state = action.news;
      return [...state];
    case types.DELETE_NEWS:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case types.ADD_NEWS:
      state.push(action.news);
      return [...state];
    case types.UPDATE_NEWS:
      index = findIndex(state, action.news.id);
      if (index !== -1) {
        state[index] = news;
      }
      return [...state];
    case types.EDIT_NEWS:
      return action.news;
    default:
      return state;
  }
};

export default news;
