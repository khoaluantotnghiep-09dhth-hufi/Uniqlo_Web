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
      return [...state];
    //Xóa Size
    case types.DELETE_NOTIFICATIONS_HEADER:
      index = findIndex(state, id);

      state.splice(index, 1);

      return [...state];
    //Thêm Size
    case types.ADD_NOTIFICATIONS_HEADER:
        // console.log('Dang o ADD reducer: '+action.nameNotifications);
      state.push(action.nameNotifications);

      return [...state];
    case types.RESET_NOTIFICATIONS_HEADER:
      console.log(state);
      resetNotifications(state);
      return [...state];
    default:
      return state;
  }
};

export default header_notifications;
