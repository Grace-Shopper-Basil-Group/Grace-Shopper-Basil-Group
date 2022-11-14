import axios from 'axios';
import history from '../history';

//action types
const SET_PRODUCTS = 'SET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

let initialState = [];

//action creators
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};
export const _createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

export const _updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

export const _deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};
//thunk creators
export const createProduct = (product) => {
  return async (dispatch) => {
    const data = await axios.post('/api/products', product);
    dispatch(_createProduct(data.data));
    history.push('/home');
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/products/${product.id}`,
        product
      );
      dispatch(_updateProduct(updated));
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const { data: product } = await axios.delete(`/api/products/${id}`);
    dispatch(_deleteProduct(product));
    history.push('/');
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/products');

    const products = response.data;
    const action = setProducts(products);
    dispatch(action);
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.products];
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    case DELETE_PRODUCT:
      return state.filter((products) => products.id !== action.product.id);
    default:
      return state;
  }
}
