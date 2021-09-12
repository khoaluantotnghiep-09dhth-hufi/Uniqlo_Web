import * as types from "./../constants/ActionTypes";

var initialState = [];
// var findIndex = (products, id) => {
//   var result = -1;
//   products.forEach((product, index) => {
//     if (product.id === id) {
//       result = index;
//     }
//   });
//   return result;
// };

var category = (state = initialState, action) => {
  // var index = -1;
  // var { users } = action;
  switch (action.type) {

    case types.FETCH_CATEGORY:
      state = action.category;
    
      return [...state];

    default:
      return state;
  }
};

export default category;
