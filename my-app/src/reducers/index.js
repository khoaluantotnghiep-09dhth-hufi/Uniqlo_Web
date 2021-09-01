import { combineReducers } from "redux";
import cart from "./cart";
import products from "./products";

import users from "./users";
import itemEditting from "./itemEditting";

const myReducer = combineReducers({
  cart, // items:items
  products, // products:

  itemEditting, // itemEditting
  users, // users
});

export default myReducer;
