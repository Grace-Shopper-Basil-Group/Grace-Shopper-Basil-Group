import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../store/allProducts';
import AddProduct from './AddProduct';
import AllUsers from './AllUsers';

export class AdminConsole extends Component {
  constructor() {
    super();

    this.state = {
      showEditForm: null,
      showAddForm: false,
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentDidMount() {
    this.props.getProducts();
  }
  handleEdit(evt) {
    evt.preventDefault();
    this.setState({ showEditForm: evt.target.id });
  }
  handleAdd(evt) {
    evt.preventDefault();
    let newBool = !this.state.showAddForm;
    this.setState({ showAddForm: newBool });
  }
  render() {
    const allProducts = this.props.allProducts;
    const access = this.props.access;

    return (
      <div>
        <h2>ADMIN CONSOLE</h2>
        <div className="admin_welcome">
          <h3>WELCOME ADMIN, HERE YOU ARE GOD</h3>
          <div className="add_prod_button_container">
            <button className="card_btns" onClick={this.handleAdd}>
              <span>Add Product</span>
            </button>
            {this.state.showAddForm && <AddProduct mode="create" />}
            <a href="/users">
              <button className="card_btns">
                <span>View Users</span>
              </button>
            </a>
          </div>
        </div>

        <div className="div_products_list">
          {allProducts.map((product) => (
            <div className="product_card" key={product.id}>
              <img src={product.imageUrl} alt="product image" />
              <h1>{product.name}</h1>
              <p className="price">Price:${product.price}</p>
              <p className="description">Description: {product.description}</p>
              <button id={product.id} onClick={this.handleEdit}>
                Edit
              </button>
              {this.state.showEditForm == product.id ? (
                <AddProduct id={product.id} mode="edit" />
              ) : null}
              <button onClick={() => {const token = window.localStorage.getItem('token'); this.props.deleteProduct(product.id, token)}}>
                Delete
              </button>
            </div>
          ))}
        </div>
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
    deleteProduct: (product, token) => dispatch(deleteProduct(product, token)),
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminConsole);
