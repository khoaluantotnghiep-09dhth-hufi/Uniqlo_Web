import { combineReducers } from "redux";
import cart from "./cart";
import products from "./products";
import object from "./object";
import sector from "./sector";
import users from "./users";
import category from "./category";
import itemEditting from "./itemEditting";

const myReducer = combineReducers({
  cart, // items:items
  products, // products:
  object,
  sector,
  category,
  itemEditting, // itemEditting
  users, // users
});

export default myReducer;
