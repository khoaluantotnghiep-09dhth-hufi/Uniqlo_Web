import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
import {  toast } from 'react-toastify';
//Giỏ Hàng
export const listAll = () => {
  return {
    type: types.LIST_ALL,
  };
};

export const addItem = (cart) => {
  return {
    type: types.ADD_ITEM,
    cart,
  };
};

export const deleteItem = (id) => {
  return {
    type: types.DELETE_ITEM,
    id,
  };
};
//Thêm sản phẩm vào giỏ hàng
export const addToCart = (product, quantity) => {
  return {
    type: types.ADD_TO_CART,
    product,
    quantity,
  };
};
//Xóa sản phẩm trong giỏ hàng
export const removeToCart = (product) => {
  return {
    type: types.REMOVE_TO_CART,
    product,
  };
};
//Cập nhật giỏ hàng
export const updateQuantity = (product, quantity) => {
  return {
    type: types.UPDATE_QUANTITY_CART,
    product,
    quantity,
  };
};

//Rest Cart
export const onRestCart = (product) => {
  return {
    type: types.RESET_CART,
    product,
  };
};

//Lấy tất cả danh sách Khách hàng
export const fetchUser = (user) => {
  return {
    type: types.FETCH_USER,
    user,

  };
};
export const onDeleteUser = (id) => {
  return {
    type: types.DELETE_USER,
    id,

  };
};
export const fetchUserRequest = () => {
  return (dispatch) => {
    return callApi("customers", "GET", null).then((response) => {
      dispatch(fetchUser(response.data));

    });


  };
};
export const onDeleteUserResquest = (id) => {
  return (dispatch) => {
    return callApi(`customers/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteUserResquest(id));
    });
  };
}
// Lấy tất cả danh sách sản phẩm
export const fetchProduct = (products_category) => {
  return {
    type: types.FETCH_PRODUCT_CATEGORY,
    products_category,
  };
};

export const fetchProductResquest = () => {
  return (dispatch) => {
    return callApi("products-category", "GET", null).then((response) => {
      dispatch(fetchProduct(response.data));
    });
  };
};

//Xóa Sản Phẩm
export const onDeleteProduct = (id) => {
  return {
    type: types.DELETE_PRODUCT,
    id,
  };
};

export const onDeleteProductResquest = (id) => {
  return (dispatch) => {
    return callApi(`products/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteProduct(id));
    });
  };
};
//Thêm sản phẩm




//Lấy tất cả danh sách Sector
export const fetchSector = (sector) => {
  return {
    type: types.FETCH_SECTOR,
    sector,
  };
};

export const fetchSectorResquest = () => {
  return (dispatch) => {
    return callApi("sectors", "GET", null).then((response) => {
      dispatch(fetchSector(response.data));
    });
  };
};

//Lấy tất cả danh sách Categories
export const fetchCategory = (category) => {
  return {
    type: types.FETCH_CATEGORY,
    category,
  };
};

export const fetchCategoryResquest = () => {
  return (dispatch) => {
    return callApi("categories", "GET", null).then((response) => {
      dispatch(fetchCategory(response.data));
    });
  };
};
//Lấy tất cả danh sách Bills_Customer
export const fetchBillsCustomer = (bills_customer) => {
  return {
    type: types.FETCH_BILLS_CUSTOMER,
    bills_customer,
  };
};

export const fetchBillsCustomerResquest = () => {
  return (dispatch) => {
    return callApi("bill-customer", "GET", null).then((response) => {
      dispatch(fetchBillsCustomer(response.data));
    });
  };
};
//Lấy tất cả danh sách Promotion
export const fetchPromotions = (promotion) => {
  return {
    type: types.FETCH_PROMOTION,
    promotion,
  };
};

export const fetchPromotionsResquest = () => {
  return (dispatch) => {
    return callApi("promotions", "GET", null).then((response) => {
      dispatch(fetchPromotions(response.data));
    });
  };
};

//Xóa Promotion
export const onDeletePromotion = (id) => {
  return {
    type: types.DELETE_PROMOTION,
    id,
  };
};

export const onDeletePromotionResquest = (id) => {
  return (dispatch) => {
    return callApi(`promotions/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeletePromotion(id));
    });
  };
};
//Thêm Promotion
export const onAddPromotion = (promotion) => {
  return {
    type: types.ADD_PROMOTION,
    promotion,
  };
};




export const onAddPromotionResquest = (promotion) => {
  return (dispatch) => {
    return callApi("promotions", "POST", promotion).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddPromotion(response.data));
    });
  };
};
//Cập Promotion
export const onUpdatePromotion = (promotion) => {
  return {
    type: types.UPDATE_PROMOTION,
    promotion,
  };
};
export const onUpdatePromotionResquest = (promotion) => {
  return (dispatch) => {
    return callApi(`promotions/${promotion.id}`, "PUT", promotion).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdatePromotion(response.data));
      }
    );
  };
};


//Sửa Promotion
export const onGetPromotion = (promotion) => {
  return {
    type: types.EDIT_PROMOTION,
    promotion,
  };
};
export const onEditPromotionResquest = (id) => {
  return (dispatch) => {
    return callApi(`promotions/${id}`, "GET", null).then((response) => {
      dispatch(onGetPromotion(response.data));
    });
  };
};

//Lấy tất cả danh sách Staff
export const fetchStaffs = (staff) => {
  return {
    type: types.FETCH_STAFF,
    staff,
  };
};

export const fetchStaffsResquest = () => {
  return (dispatch) => {
    return callApi("staffs", "GET", null).then((response) => {
      dispatch(fetchStaffs(response.data));
    });
  };
};

//Xóa Staff
export const onDeleteStaffs = (id) => {
  return {
    type: types.DELETE_STAFF,
    id,
  };
};

export const onDeleteStaffsResquest = (id) => {
  return (dispatch) => {
    return callApi(`staffs/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteStaffs(id));
    });
  };
};
//Thêm Staff
export const onAddStaffs = (staff) => {
  return {
    type: types.ADD_STAFF,
    staff,
  };
};

export const onAddStaffsResquest = (staff) => {
  return (dispatch) => {
    return callApi("staffs", "POST", staff).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddStaffs(response.data));
    });
  };
};
//Cập Staff
export const onUpdateStaffs = (staff) => {
  return {
    type: types.UPDATE_STAFF,
    staff,
  };
};
export const onUpdateStaffsResquest = (staff) => {
  return (dispatch) => {
    return callApi(`staffs/${staff.id}`, "PUT", staff).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateStaffs(response.data));
      }
    );
  };
};

//Sửa Staff
export const onGetStaffs = (staff) => {
  return {
    type: types.EDIT_STAFF,
    staff,
  };
};
export const onEditStaffsResquest = (id) => {
  return (dispatch) => {
    return callApi(`staffs/${id}`, "GET", null).then((response) => {
      dispatch(onGetStaffs(response.data));
    });
  };
};

//Lấy tất cả danh sách Color
export const fetchColors = (color) => {
  return {
    type: types.FETCH_COLOR,
    color,
  };
};

export const fetchColorResquest = () => {
  return (dispatch) => {
    return callApi("color", "GET", null).then((response) => {
      dispatch(fetchColors(response.data));
    });
  };
};

//Xóa Color
export const onDeleteColor = (id) => {
  return {
    type: types.DELETE_COLOR,
    id,
  };
};

export const onDeleteColorResquest = (id) => {
  return (dispatch) => {
    return callApi(`color/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteColor(id));
    });
  };
};
//Thêm Color
export const onAddColor = (color) => {
  return {
    type: types.ADD_COLOR,
    color,
  };
};

export const onAddColorResquest = (color) => {
  return (dispatch) => {
    return callApi("color", "POST", color).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddColor(response.data));
    });
  };
};
//Cập Color
export const onUpdateColor = (color) => {
  return {
    type: types.UPDATE_COLOR,
    color,
  };
};
export const onUpdateColorResquest = (color) => {
  return (dispatch) => {
    return callApi(`color/${color.id}`, "PUT", color).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateColor(response.data));
      }
    );
  };
};

//Sửa Color
export const onGetColor = (color) => {
  return {
    type: types.EDIT_COLOR,
    color,
  };
};
export const onEditColorResquest = (id) => {
  return (dispatch) => {
    return callApi(`color/${id}`, "GET", null).then((response) => {
      dispatch(onGetColor(response.data));
    });
  };
};

//Lấy tất cả danh sách  Size
export const fetchSizes = (size) => {
  return {
    type: types.FETCH_SIZE,
    size,
  };
};

export const fetchSizeResquest = () => {
  return (dispatch) => {
    return callApi("size", "GET", null).then((response) => {
      dispatch(fetchSizes(response.data));
    });
  };
};

//Xóa  Size
export const onDeleteSize = (id) => {
  return {
    type: types.DELETE_SIZE,
    id,
  };
};

export const onDeleteSizeResquest = (id) => {
  return (dispatch) => {
    return callApi(`size/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteSize(id));
    });
  };
};
//Thêm  Size
export const onAddSize = (size) => {
  return {
    type: types.ADD_SIZE,
    size,
  };
};

export const onAddSizeResquest = (size) => {
  return (dispatch) => {
    return callApi("size", "POST", size).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddSize(response.data));
    });
  };
};
//Cập  Size
export const onUpdateSize = (size) => {
  return {
    type: types.UPDATE_SIZE,
    size,
  };
};
export const onUpdateSizeResquest = (size) => {
  return (dispatch) => {
    return callApi(`size/${size.id}`, "PUT", size).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateSize(response.data));
      }
    );
  };
};

//Sửa Size
export const onGetSize = (size) => {
  return {
    type: types.EDIT_SIZE,
    size,
  };
};
export const onEditSizeResquest = (id) => {
  return (dispatch) => {
    return callApi(`size/${id}`, "GET", null).then((response) => {
      dispatch(onGetSize(response.data));
    });
  };
};


//Lấy tất cả danh sách  Bill
export const fetchBills = (bill) => {
  return {
    type: types.FETCH_BILL,
    bill,
  };
};

export const fetchBillResquest = () => {
  return (dispatch) => {
    return callApi("bills", "GET", null).then((response) => {
      dispatch(fetchBills(response.data));
    });
  };
};

//Xóa  Bill
export const onDeleteBill = (id) => {
  return {
    type: types.DELETE_BILL,
    id,
  };
};

export const onDeleteBillResquest = (id) => {
  return (dispatch) => {
    return callApi(`bills/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteBill(id));
    });
  };
};

//Cập  Bill
export const onUpdateBill = (bill) => {
  return {
    type: types.UPDATE_BILL,
    bill,
  };
};
export const onUpdateBillResquest = (bill) => {
  return (dispatch) => {
    return callApi(`bills/${bill.id}`, "PUT", bill).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateBill(response.data));
      }
    );
  };
};

//Sửa Bill
export const onGetBill = (bill) => {
  return {
    type: types.EDIT_BILL,
    bill,
  };
};
export const onEditBillResquest = (id) => {
  return (dispatch) => {
    return callApi(`bills/${id}`, "GET", null).then((response) => {
      dispatch(onGetBill(response.data));
    });
  };
};

//news 
export const fetchNews = (news) => {
  return {
    type: types.FETCH_NEWS,
    news,
  };
};

export const fetchNewsResquest = () => {
  return (dispatch) => {
    return callApi("news", "GET", null).then((response) => {
      dispatch(fetchNews(response.data));
    });
  };
};

export const onAddNews = (news) => {
  return {
    type: types.ADD_NEWS,
    news,
  };
};
export const onAddNewsResquest = (news) => {
  return (dispatch) => {
    return callApi("news", "POST", news).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddNews(response.data));
      console.log(response.data);
    });
  };
};

export const onUpdateNews = (news) => {
  return {
    type: types.UPDATE_NEWS,
    news,
  };
};
export const onUpdateNewsResquest = (news) => {
  return (dispatch) => {
    return callApi(`news/${news.id}`, "PUT", news).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateNews(response.data));
      }
    );
  };
};
export const onDeleteNews = (id) => {
  return {
    type: types.DELETE_NEWS,
    id,
  };
};

export const onDeleteNewsResquest = (id) => {
  return (dispatch) => {
    return callApi(`news/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteNews(id));
    });
  };
};

export const onGetNews = (news) => {
  return {
    type: types.EDIT_NEWS,
    news,
  };
};
export const onEditNewsResquest = (id) => {
  return (dispatch) => {
    return callApi(`news/${id}`, "GET", null).then((response) => {
      dispatch(onGetNews(response.data));
    });
  };
};

//category =

export const onAddCategory = (category) => {
  return {
    type: types.ADD_CATEGORY,
    category,
  };
};
export const onAddCategoryResquest = (category) => {
  return (dispatch) => {
    return callApi("categories", "POST", category).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddCategory(response.data));
    });
  };
};

export const onUpdateCategory = (category) => {
  return {
    type: types.UPDATE_CATEGORY,
    category,
  };
};
export const onUpdateCategoryResquest = (category) => {
  return (dispatch) => {
    return callApi(`categories/${category.id}`, "PUT", category).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateCategory(response.data));
      }
    );
  };
};
export const onDeleteCategory = (id) => {
  return {
    type: types.DELETE_CATEGORY,
    id,
  };
};

export const onDeleteCategoryResquest = (id) => {
  return (dispatch) => {
    return callApi(`categories/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteCategory(id));
    });
  };
};
export const onGetCategory = (category) => {
  return {
    type: types.EDIT_CATEGORY,
    category,
  };
};
export const onEditCategoryResquest = (id) => {
  return (dispatch) => {
    return callApi(`categories/${id}`, "GET", null).then((response) => {
      dispatch(onGetCategory(response.data));
    });
  };
};
// lấy ds khách hàng
export const fetchCustomer = (customer) => {
  return {
    type: types.FETCH_CUSTOMER,
    customer,
  };
};

export const fetchCustomerResquest = () => {
  return (dispatch) => {
    return callApi("customers", "GET", null).then((response) => {
      dispatch(fetchCustomer(response.data));
    });
  };
};

//thêm khách hàng
export const onAddCustomer = (customer) => {
  return {
    type: types.ADD_CUSTOMER,
    customer,
  };
};
export const onAddCustomerResquest = (customer) => {
  return (dispatch) => {
    return callApi("customers", "POST", customer).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddCustomer(response.data));
    });
  };
};

//cập nhập khách hàng
export const onUpdateCustomers = (customer) => {
  return {
    type: types.UPDATE_CUSTOMER,
    customer,
  };
};
export const onUpdateCustomersResquest = (customer) => {
  return (dispatch) => {
    return callApi(`customers/${customer.id}`, "PUT", customer).then(

      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateCustomers(response.data));
      }
    );
  };
};

//sửa tt khách hàng
export const onGetCustomer = (customer) => {
  return {
    type: types.EDIT_CUSTOMER,
    customer,
  };
};
export const onEditCustomerResquest = (id) => {
  return (dispatch) => {
    return callApi(`customers/${id}`, "GET", null).then((response) => {
      dispatch(onGetCustomer(response.data));
    });
  };
};

//Xoá khách hàng
export const onDeleteCustomer = (id) => {
  return {
    type: types.DELETE_CUSTOMER,
    id,
  };
};

export const onDeleteCustomerResquest = (id) => {
  return (dispatch) => {
    return callApi(`customers/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteCustomer(id));
    });
  };
};


//orders
export const fetchOrder = (order) => {
  return {
    type: types.FETCH_ORDER,
    order,
  };
};

export const fetchOrderResquest = () => {
  return (dispatch) => {
    return callApi("orders", "GET", null).then((response) => {
      dispatch(fetchOrder(response.data));
    });
  };
};

//Xóa Color
export const onDeleteOrder = (id) => {
  return {
    type: types.DELETE_ORDER,
    id,
  };
};

export const onDeleteOrderResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteOrder(id));
    });
  };
};
//Thêm Color
export const onAddOrder = (order) => {
  return {
    type: types.ADD_ORDER,
    order,
  };
};

export const onAddOrderResquest = (order) => {
  return (dispatch) => {
    return callApi("orders", "POST", order).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddOrder(response.data));
    });
  };
};
//Cập Color
export const onUpdateOrder = (order) => {
  return {
    type: types.UPDATE_ORDER,
    order,
  };
};
export const onUpdateOrderResquest = (order) => {
  return (dispatch) => {
    return callApi(`orders/${order.id}`, "PUT", order).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateOrder(response.data));
      }
    );
  };
};

//Sửa Color
export const onGetOrder = (order) => {
  return {
    type: types.EDIT_ORDER,
    order,
  };
};
export const onEditOrderResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders/${id}`, "GET", null).then((response) => {
      dispatch(onGetOrder(response.data));
    });
  };
};

//order info
export const fetchOrderInfo = (id) => {
  return {
    type: types.FETCH_ORDERINFO,
    id,
  };
};

export const fetchOrderInfoResquest = (id) => {
  return (dispatch) => {
    return callApi(`orders-info/${id}`, "GET", null).then((response) => {
      dispatch(fetchOrderInfo(response.data));
    });
  };
};
//sector 


export const onAddSector = (sector) => {
  return {
    type: types.ADD_SECTOR,
    sector,
  };
};
export const onAddSectorResquest = (sector) => {
  return (dispatch) => {
    return callApi("sectors", "POST", sector).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddSector(response.data));
    });
  };
};

export const onUpdateSector = (sector) => {
  return {
    type: types.UPDATE_SECTOR,
    sector,
  };
};
export const onUpdateSectorResquest = (sector) => {
  return (dispatch) => {
    return callApi(`sectors/${sector.id}`, "PUT", sector).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateSector(response.data));
      }
    );
  };
};
export const onDeleteSector = (id) => {
  return {
    type: types.DELETE_SECTOR,
    id,
  };
};

export const onDeleteSectorResquest = (id) => {
  return (dispatch) => {
    return callApi(`sectors/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteSector(id));
    });
  };
};
export const onGetSector = (sector) => {
  return {
    type: types.EDIT_SECTOR,
    sector,
  };
};
export const onEditSectorResquest = (id) => {
  return (dispatch) => {
    return callApi(`sectors/${id}`, "GET", null).then((response) => {
      dispatch(onGetSector(response.data));
    });
  };
};




//Lấy tất cả danh sách Object

export const fetchObjects = (object_menu) => {
  return {
    type: types.FETCH_OBJECT,
    object_menu,
  };
};

export const fetchObjectsResquest = () => {
  return (dispatch) => {
    return callApi("objects", "GET", null).then((response) => {
      dispatch(fetchObjects(response.data));
    });
  };
};
//Them
export const onAddObjects = (object_menu) => {
  return {
    type: types.ADD_OBJECT,
    object_menu,
  };
};
export const onAddObjectsResquest = (object_menu) => {
  return (dispatch) => {
    return callApi("objects", "POST", object_menu).then((response) => {
      toast.success("Thêm thành công !");
      dispatch(onAddObjects(response.data));
    });
  };
};
//xóa object 
export const onDeleteObjects = (id) => {
  return {
    type: types.DELETE_OBJECT,
    id,
  };
};

export const onDeleteObjectsResquest = (id) => {
  return (dispatch) => {
    return callApi(`objects/${id}`, "DELETE", null).then((response) => {
      toast.success("Xóa thành công !");
      dispatch(onDeleteObjects(id));
    });
  };
};
//sửa object 
export const onGetObjects = (object_menu) => {
  return {
    type: types.EDIT_OBJECT,
    object_menu,
  };
};
export const onEditObjectsResquest = (id) => {
  return (dispatch) => {
    return callApi(`objects/${id}`, "GET", null).then((response) => {
      dispatch(onGetObjects(response.data));
    });
  };
};
//cập nhật object
export const onUpdateObjects = (object_menu) => {
  return {
    type: types.UPDATE_OBJECT,
    object_menu,
  };
};
export const onUpdateObjectsResquest = (object_menu) => {
  return (dispatch) => {
    return callApi(`objects/${object_menu.id}`, "PUT", object_menu).then(
      (response) => {
        toast.success("Sửa thành công !");
        dispatch(onUpdateObjects(response.data));
      }
    );
  };
};

//lấy Tất cả Color Theo Size
export const onGetAllColorBySize = (color_by_size) => {
  return {
    type: types.GET_ALL_COLOR_BY_SIZE,
    color_by_size,
  };
};
export const onGetAllColorBySizeResquest = (id_product) => {
  return (dispatch) => {
    return callApi(`product-sizes/${id_product}`, "GET", null).then((response) => {
      dispatch(onGetAllColorBySize(response.data));
    });
  };
};