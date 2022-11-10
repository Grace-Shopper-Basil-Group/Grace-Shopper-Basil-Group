import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';

export const getSingleProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product,
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      const product = response.data;
      dispatch(getSingleProduct(product));
    } catch (e) {
      next(e);
    }
  };
};

export default function singleProductReducer(singleProduct = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    default:
      return singleProduct;
  }
}
