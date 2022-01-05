import { combineReducers } from "redux";
import cart from "./Carts/cart";
import header_notifications from "./header_notifications/header_notifications";
import banner from "./Banner/banner";
import bannerEdit from "./Banner/bannerEdit";


import products from "./Products/products";
import productsEdit from "./Products/productsEdit";


import products_category from "./Products_Category/products_category";
import productInfo from "./ProductInfo/productInfo";

import object_menu from "./Objects/object";
import object_menuEdit from "./Objects/objectEdit";

import sector from "./Sectors/sector";
import sectorEdit from "./Sectors/sectorEdit";

import users from "./Users/users";
import staff from "./Staffs/staff";
import staffEdit from "./Staffs/staffEdit";

import color from "./Colors/color";
import colorEdit from "./Colors/colorEdit";

import color_by_size from "./Color_By_Size/color_by_size";
import bill from "./Bills/bill";
import billEdit from "./Bills/billEdit";

import size from "./Sizes/size";
import sizeEdit from "./Sizes/sizeEdit";

import news from "./News/news";
import newsEdit from "./News/newsEdit";

import post from "./Post/post";
import postEdit from "./Post/postEdit";
import customer from "./Customer/customer";
import customerEdit from "./Customer/customerEdit";

import category from "./Categories/category";
import categoryEdit from "./Categories/categoryEdit";


import promotion from "./Promotions/promotion";
import promotionEdit from "./Promotions/promotionEdit";

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
  products,
  productsEdit,// products:
  object_menu,
  object_menuEdit,
  sector,
  sectorEdit,
  category,
  categoryEdit,
  color,
  colorEdit,
  size,
  sizeEdit,
  users, // users
  bills_customer,
  promotion,
  promotionEdit,
  staff,
  staffEdit,
  bill,
  billEdit,
  news,
  newsEdit,
  customer,
  customerEdit,
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
