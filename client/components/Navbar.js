import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { fetchCart } from "../store/cart";

class Navbar extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props)

  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      this.props.getCart(token);
    }
  }

  render() {
    const { handleClick, isLoggedIn, auth } = this.props
    return(
      <div>
        <h1>WALLY WORLD</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/">Home</Link>

              {auth === 'admin' ? <Link to="/admin"> Admin</Link> : null}
              <Link to="/cart">Cart</Link>

              <a href="/" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/">Home</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth.accessRights,
    username: state.auth.username,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getCart: (token) => {
      dispatch(fetchCart({ headers: { authorization: token } }));
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
