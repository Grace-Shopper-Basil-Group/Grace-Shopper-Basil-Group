import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';

const getSingleProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      product = response.data;
      console.log('response :>> ', response);
      dispatch(getSingleProduct(product));
    } catch (e) {
      next(e);
    }
  };
};

const initialState = {};

export default function singleProductReducer(state = initialState, action) {
  console.log('state :>> ', state);
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
