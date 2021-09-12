import * as types from "./../constants/ActionTypes";
import callApi from "./../Admin/utils/Callapi";
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

export const addToCart = (product, quantity) => {
  return {
    type: types.ADD_TO_CART,
    product,
    quantity,
  };
};
export const removeToCart = (product) => {
  return {
    type: types.REMOVE_TO_CART,
    product,
  };
};

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



//Axios  Get All user
export const fetchUser = (user) => {
  return {
    type: types.FETCH_USER,
    user
  }
}

export const fetchUserRequest = () => {
  return dispatch=> {
    return callApi("users","GET", null).then((response=>{
      dispatch(fetchUser(response.data));
    }));
  }
}



// Axios Get Products
export const fetchProduct = (products) => {
  return {
    type: types.FETCH_PRODUCT,
    products,
  };
};

export const fetchProductResquest = () => {
  return (dispatch) => {
    return callApi("products", "GET", null).then((response) => {
      dispatch(fetchProduct(response.data));
    });
  };
};

//Delete
export const onDeleteProduct = (id) => {
  return {
    type: types.DELETE_PRODUCT,
    id,
  };
};

export const onDeleteProductResquest = (id) => {
  return (dispatch) => {
    return callApi(`products/${id}`, "DELETE", null).then((response) => {
      dispatch(onDeleteProduct(id));
    });
  };
};
//Add_Item
export const onAddProduct = (product) => {
  return {
    type: types.ADD_PRODUCT,
    product,
  };
};

export const onAddProductResquest = (product) => {
  return (dispatch) => {
    return callApi("products", "POST", product).then((response) => {
      dispatch(onAddProduct(response.data));
    });
  };
};
//Update_Product
export const onUpdateProduct = (product) => {
  return {
    type: types.UPDATE_PRODUCT,
    product,
  };
};
export const onUpdateProductResquest = (product) => {
  return (dispatch) => {
    return callApi(`products/${product.id}`, "PUT", product).then(
      (response) => {
        dispatch(onUpdateProduct(response.data));
      }
    );
  };
};

//Edit
export const onGetProduct = (product) => {
  return {
    type: types.EDIT_PRODUCT,
    product,
  };
};
export const onEditProductResquest = (id) => {
  return (dispatch) => {
    return callApi(`products/${id}`, "GET", null).then((response) => {
      dispatch(onGetProduct(response.data));
    });
  };
};

//Login to

// Get Object 

export const fetchObject = (object) => {
  return {
    type: types.FETCH_OBJECT,
    object,
  };
};

export const fetchObjectResquest = () => {
  return (dispatch) => {
    return callApi("objects", "GET", null).then((response) => {
     
      dispatch(fetchObject(response.data));
    
    });
  };
};

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

//get Caterogy
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