import { combineReducers } from "redux";
import cart from "./Carts/cart";
import products from "./Products/products";
import products_category from "./Products_Category/products_category";

import object from "./Objects/object";
import sector from "./Sectors/sector";
import users from "./Users/users";
import staff from "./Staffs/staff";
import color from "./Colors/color";
import bill from "./Bills/bill";
import size from "./Sizes/size";
import news from "./News/news";
import customer from "./Customer/customer";
import category from "./Categories/category";
import promotion from "./Promotions/promotion";
import order from "./Order/order";
import bills_customer from "./Bills_Customer/bills_customer";

const myReducer = combineReducers({
  cart, // items:items
  products, // products:
  object,
  sector,
  category,
  color,
  size,
  users, // users
  bills_customer,
  promotion,
  staff,
  bill,
  news,
  customer,
  order,
  products_category,
});

export default myReducer;
