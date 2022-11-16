import axios from 'axios';
import history from '../history';

const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const EDIT_QUANTITY = 'EDIT_QUANTITY';
const CHECKOUT_CART = 'CHECKOUT_CART';

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
  };
};

export const removeItem = (itemId) => {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
};

export const editQuant = (item) => {
  return {
    type: EDIT_QUANTITY,
    item,
  };
};

export const checkoutCart = (cart) => {
  return {
    type: CHECKOUT_CART,
    cart,
  };
};

export const addItemToCart = (token, item, cartId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/orders/cart', {
        headers: { authorization: token },
        item: item,
        cartId: cartId,
      });
      const addedItem = response.data;
      item.orderItem = addedItem;
      dispatch(addItem(item));
      history.push('/cart');
    } catch (e) {
      console.error(e);
    }
  };
};
export const editItemQuant = (token, itemId, cartId, quant) => {
  return async (dispatch) => {
    try {
      const response = await axios('/api/orders/cart', {
        headers: { authorization: token },
        data: { itemId: itemId, cartId: cartId, quantity: +quant },
        method: 'put',
      });
      const editedItem = response.data;
      dispatch(editQuant(editedItem));
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeItemFromCart = (token, itemId, cartId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete('/api/orders/cart', {
        headers: { authorization: token },
        data: { itemId: itemId, cartId: cartId },
      });
      dispatch(removeItem(itemId));
    } catch (e) {
      console.error(e);
    }
  };
};

export const fetchCart = (reqBody) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/orders/cart', reqBody);

      const cart = response.data;
      dispatch(getCart(cart));
    } catch (e) {
      console.error(e);
    }
  };
};

export const cartCheckout = (token, cartId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('/api/orders/cart/checkout', {
        headers: { authorization: token },
        cartId: cartId,
      });
      const checkedoutCart = response.data;
      dispatch(checkoutCart(checkedoutCart));
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
      let newAddProducts = cart.products.map((product) => {
        if (product.id === action.item.id) {
          replace = true;
          return action.item;
        } else {
          return product;
        }
      });
      if (!replace) {
        newAddProducts.push(action.item);
      }
      let newCart = cart;
      newCart.products = newAddProducts;
      return newCart;
    case EDIT_QUANTITY:
      let newEditProducts = cart.products.map((product) => {
        if (product.id == action.item.productId) {
          product.orderItem = action.item;
          return product;
        } else {
          return product;
        }
      });
      return { ...cart, products: newEditProducts };
    case REMOVE_ITEM:
      let productsArray = [];
      let newRemoveProducts = cart.products.reduce(
        (runningList, currentProduct) => {
          if (currentProduct.id !== action.itemId) {
            productsArray.push(currentProduct);
            return productsArray;
          }
        },
        productsArray
      );
      return { ...cart, products: productsArray };
    case CHECKOUT_CART:
      return { ...cart, completed: true };
    default:
      return cart;
  }
}
