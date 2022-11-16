import axios from 'axios';

//action types
const SET_USERS = 'SET_USERS';

let initialState = [];

//action creators
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

//thunk creators
export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    const users = response.data;
    const action = setUsers(users);
    dispatch(action);
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return [...action.users];
    default:
      return state;
  }
}
