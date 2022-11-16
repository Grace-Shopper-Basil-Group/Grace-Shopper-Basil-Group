import axios from 'axios';

//action types
const SET_USERS = 'SET_USERS';
const SINGLE_USER = 'SINGLE_USER';

let initialState = [];

//action creators
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};
export const singleUser = (user) => {
  return {
    type: SINGLE_USER,
    user,
  };
};

//thunk creators
export const fetchUsers = (token) => {
  return async (dispatch) => {
    const response = await axios.get('/api/users', { headers: { authorization: token } });
    const users = response.data;
    const action = setUsers(users);
    dispatch(action);
  };
};
export const fetchSingleUser = (id, token) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/users/${id}`, { headers: { authorization: token }});
    const user = response.data;
    const action = singleUser(user);
    dispatch(action);
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return [...action.users];
    case SINGLE_USER:
      return [action.user];
    default:
      return state;
  }
}
