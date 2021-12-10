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
  var { id, news } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Danh Mục
    case types.FETCH_NEWS:
      debugger
      state = news;
    
      return [...state];
    case types.DELETE_NEWS:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case types.ADD_NEWS:
      debugger
      console.log(state)
      if(state){
        state.push(news);
      }
     else{
       console.log("State Dang Rong")
     }
      return [...state];
    case types.UPDATE_NEWS:
      debugger
      index = findIndex(state,action.news.id);
      if (index !== -1) {
        state[index] = news;
      }
      console.log("UPDATE DATE :"+ index);
      return [...state];
    case types.EDIT_NEWS:
      return action.news;
    default:
      return state;
  }
};

export default news;
