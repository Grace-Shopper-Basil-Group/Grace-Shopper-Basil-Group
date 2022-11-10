import axios from "axios";

const GET_CART = "GET_CART";

export const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

export const fetchCart = (reqBody) => {
  return async (dispatch) => {
    try {
      console.log(reqBody);
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
    default:
      return cart;
  }
}
