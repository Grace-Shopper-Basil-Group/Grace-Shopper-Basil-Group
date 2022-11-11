import axios from "axios";

const GET_CART = "GET_CART";
const ADD_ITEM = "ADD_ITEM"

export const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  }
}

export const addItemToCart = (token, item, cartId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/orders/cart", { headers: {authorization: token}, item: item, cartId: cartId });
      const addedItem = response.data
      item.orderItem = addedItem;
      dispatch(addItem(item));
    } catch (e) {
      console.error(e)
    }
  }
}

export const fetchCart = (reqBody) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/orders/cart", reqBody);
      const cart = response.data;
      dispatch(getCart(cart));
    } catch (e) {
      console.error(e);
    }
  };
};

export default function cartReducer(cart = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case ADD_ITEM:
      let replace = false;
      let newProducts = cart.products.map((product) => {
        if (product.id === action.item.id) {
          replace = true;
          return action.item;
        } else {
          return product
        }
      })
      if (!replace) {
        newProducts.push(action.item)
      }
      let newCart = cart;
      newCart.products = newProducts;
      return newCart
    default:
      return cart;
  }
}
