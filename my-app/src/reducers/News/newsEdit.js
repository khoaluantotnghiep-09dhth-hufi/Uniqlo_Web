import * as types from "../../constants/ActionTypes";

var initialState = {};

var findIndex = (news, id) => {
  var rs = -1;
  news.forEach((item, index) => {
    if (item.id === id) {
      rs = index;
    }
  });
  return rs;
}
var newsEdit = (state = initialState, action) => {

  var index = -1;
  var { id, news } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Danh Mục
    
    case types.EDIT_NEWS:
      return action.newsEdit;
    default:
      return state;
  }
};

export default newsEdit;
