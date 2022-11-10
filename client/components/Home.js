
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/cart";
import AllProducts from './AllProducts';

/**
 * COMPONENT
 */
// add username to render
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
    };
  }
// const { username } = props;
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      this.props.getCart(token);
    }
  }

  render() {
    return (
      <div>
        <h3>Welcome</h3>
              <AllProducts />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (token) => {
      dispatch(fetchCart({ headers: { authorization: token } }));
    },
  };
};

export default connect(mapState, mapDispatchToProps)(Home);
