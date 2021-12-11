import { combineReducers } from "redux";
import cart from "./Carts/cart";
import header_notifications from "./header_notifications/header_notifications";
import banner from "./Banner/banner";
import bannerEdit from "./Banner/bannerEdit";


import products from "./Products/products";
import products_category from "./Products_Category/products_category";
import productInfo from "./ProductInfo/productInfo";
import object_menu from "./Objects/object";
import sector from "./Sectors/sector";
import users from "./Users/users";
import staff from "./Staffs/staff";
import color from "./Colors/color";
import colorEdit from "./Colors/colorEdit";

import color_by_size from "./Color_By_Size/color_by_size";
import bill from "./Bills/bill";
import size from "./Sizes/size";
import news from "./News/news";
import newsEdit from "./News/newsEdit";

import post from "./Post/post";
import postEdit from "./Post/postEdit";
import customer from "./Customer/customer";
import category from "./Categories/category";
import promotion from "./Promotions/promotion";
import order from "./Order/order";
import bills_customer from "./Bills_Customer/bills_customer";
import orderInfo from "./OrderInfo/orderInfo";
import import_product from "./ImportProduct/import_product";
import productsAdmin from "./Product_Admin/product_admin";
import importInfo from "./ImportInfo/importInfo";
import exchange from "./Exchange/exchange_product";
import billInfo from "./BillInfo/BillInfo";
import billTotal from "./Statical/statical_shop";
import billTotalQuantity from "./Statical/quantityBill";
import countStatusProduct from "./Statical/countStatusProduct";

const myReducer = combineReducers({
  cart,
  products, // products:
  object_menu,
  sector,
  category,
  color,
  colorEdit,
  size,
  users, // users
  bills_customer,
  promotion,
  staff,
  bill,
  news,
  newsEdit,
  customer,
  order,
  products_category,
  orderInfo,
  color_by_size,
  productInfo,
  import_product,
  productsAdmin,
  importInfo,
  exchange,
  billInfo,
  header_notifications,
  billTotal,
  billTotalQuantity,
  countStatusProduct,
  banner,
  bannerEdit,
  post,
  postEdit,
});

export default myReducer;
