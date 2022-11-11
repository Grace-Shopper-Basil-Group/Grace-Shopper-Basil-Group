import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/allProducts';

export class AdminConsole extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const allProducts = this.props.allProducts;
    const access = this.props.access;

    return (
      <div>
        {/* <h2>Products</h2>
        <ul>
          {allProducts.map((product) => (
            <div key={product.id}>
              <img src={product.imageUrl} alt="product image" />
              <br></br>
              {product.name}
              <br></br>

              {product.description}
            </div>
          ))}
        </ul> */}

        <div> WELCOME ADMIN, HERE YOU ARE GOD</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
    access: state.auth.accessRights,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminConsole);
