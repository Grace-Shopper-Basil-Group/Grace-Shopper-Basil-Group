import axios from "axios";

//action types
const SET_PRODUCTS = "SET_PRODUCTS";
// const CREATE_products = "CREATE_products";
// const DELETE_products = "DELETE_products";

let initialState = [];

//action creators
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};
// export const _createproducts = (products) => {
//   return {
//     type: CREATE_products,
//     products,
//   };
// };

// export const _deleteproducts = (products) => {
//   return {
//     type: DELETE_products,
//     products,
//   };
// };
//thunk creators
// export const createproducts = (products, history) => {
//   return async (dispatch) => {
//     const { data: created } = await axios.post("/api/products", products);
//     dispatch(_createproducts(created));
//     history.push("/products");
//   };
// };
// export const deleteproducts = (id, history) => {
//   return async (dispatch) => {
//     const { data: products } = await axios.delete(`/api/products/${id}`);
//     dispatch(_deleteproducts(products));
//     history.push("/products");
//   };
// };

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/products");

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
    // case CREATE_products:
    //   return [...state, ...action.products];
    // case DELETE_products:
    //   return state.filter((products) => products.id !== action.products.id);
    default:
      return state;
  }
}
