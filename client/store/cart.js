import axios from 'axios';

const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const EDIT_QUANTITY = 'EDIT_QUANTITY';

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

export const editQuant = (itemId, quantity) => {
  return {
    type: EDIT_QUANTITY,
    itemId,
    quantity,
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
    } catch (e) {
      console.error(e);
    }
  };
};

export const editItemQuant = (token, itemId, cartId, quant) => {
  return async (dispatch) => {
    console.log(itemId, cartId);
    try {
      const response = await axios.post('/api/orders/cart', {
        headers: { authorization: token },
        data: { itemId: itemId, cartId: cartId },
      });
      const editedItem = response.data;
      item.orderItem = addedItem;
      dispatch(editQuant(item));
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeItemFromCart = (token, itemId, cartId) => {
  return async (dispatch) => {
    console.log(itemId, cartId);
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
      let productsArray = [];
      let newEditProducts = cart.products.map((orderItem) => {
        if (orderItem.id === action.itemId) {
          return { ...orderItem, quantity: action.quantity };
        } else {
          return orderItem;
        }
      });
      return { ...cart, orderItem };
    // case REMOVE_ITEM:
    //   let productsArray = [];
    //   let newRemoveProducts = cart.products.reduce(
    //     (runningList, currentProduct) => {
    //       if (currentProduct.id !== action.itemId) {
    //         productsArray.push(currentProduct);
    //         return productsArray;
    //       }
    //     },
    //     productsArray
    //   );
    //   return { ...cart, products: productsArray };
    default:
      return cart;
  }
}
