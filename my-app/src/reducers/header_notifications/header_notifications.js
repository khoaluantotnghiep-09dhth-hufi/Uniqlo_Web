import * as types from "./../../constants/ActionTypes";

var initialState = [];
var findIndex = (header_notifications, id) => {
  var result = -1;
  header_notifications.forEach((item, index) => {
    if (item.id === id) {
      result = index;
    }
  });
  return result;
};
var resetNotifications = (nameNotifications) => {
  while (nameNotifications.length) {
    nameNotifications.pop();
  }
};
var header_notifications = (state = initialState, action) => {
  var index = -1;
  var { id } = action;
  switch (action.type) {
    //Lấy Tất cả Danh Sách Size
    case types.FETCH_NOTIFICATIONS_HEADER:
      state = action.nameNotifications;
      return [...state];
    //Xóa Size
    case types.DELETE_NOTIFICATIONS_HEADER:
      console.log(id);
      console.log(state);
      index = findIndex(state, id);

      if (index !== -1) {
        state.splice(index, 1);
      }
   
      return [...state];

    
    //Thêm Size
    case types.ADD_NOTIFICATIONS_HEADER:
      // console.log('Dang o ADD reducer: '+action.nameNotifications);
      var newItem = {

        title: action.nameNotifications,

      };

      state.push(action.nameNotifications);
   
      // state.push(action.nameNotifications);

      return [...state];
    case types.RESET_NOTIFICATIONS_HEADER:

      resetNotifications(state);
      return [...state];
    default:
      return state;
  }
};

export default header_notifications;
