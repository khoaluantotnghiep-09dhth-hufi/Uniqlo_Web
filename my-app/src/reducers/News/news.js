import * as types from "./../../constants/ActionTypes";

var initialState = [];

var findIndex = (news, id) => {
  var result = -1;
  news.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
}
var news = (state = initialState, action) => {
  var index = -1;
  var { id, news } = action;
  switch (action.type) {
    //Lấy ds news
    case types.FETCH_NEWS:
      state = news;
      return [...state];
    //Xoá tin tức
    case types.DELETE_NEWS:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
      //Thêm tin tức
    case types.ADD_NEWS:
      console.log(state)
      if(state){
        state.push(news);
      }
      else{
       console.log("State đang rỗng")
      }
      return [...state];
      //Cập nhập tin tức
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
