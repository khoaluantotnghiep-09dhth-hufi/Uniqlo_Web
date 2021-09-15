import { combineReducers } from "redux";
import cart from "./Carts/cart";
import products from "./Products/products";
import object from "./Objects/object";
import sector from "./Sectors/sector";
import users from "./Users/users";
import staff from "./Staffs/staff";
import color from "./Colors/color";
import category from "./Categories/category";
import promotion from "./Promotions/promotion";

import bills_customer from "./Bills_Customer/bills_customer";

const myReducer = combineReducers({
  cart, // items:items
  products, // products:
  object,
  sector,
  category,
  color,
  users, // users
  bills_customer,
  promotion,
  staff,
});

export default myReducer;
