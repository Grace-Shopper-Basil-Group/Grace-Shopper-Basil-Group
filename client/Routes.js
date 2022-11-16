import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import ViewCart from './components/ViewCart';
import Checkout from './components/Checkout';
import Home from './components/Home';
import { me } from './store';
import AdminConsole from './components/AdminConsole';
import Guestcart from './components/Guestcart';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/products/:id" exact component={SingleProduct} />
          <Route exact path="/" component={Home} />
        </Switch>
        {isLoggedIn ? (
          <Switch>
            <Route path="/cart" component={ViewCart} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Guestcart} />
          </Switch>
        )}
        {this.props.auth === 'admin' ? (
          <Switch>
            <Route exact path="/admin" component={AdminConsole} />
          </Switch>
        ) : null}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth.accessRights,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
