import React, { Component } from 'react';
import { createProduct, updateProduct } from '../store/allProducts';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: 0,
      imageUrl: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const token = window.localStorage.getItem('token');
    let imageUrl = this.state.imageUrl;
    let id = this.props.id;
    if (imageUrl === '') {
      imageUrl = 'https://via.placeholder.com/200';
    }
    if (this.props.mode === 'edit') {
      this.props.createProd(this.props.mode, { ...this.state, id, imageUrl }, token);
    } else {
      this.props.createProd(this.props.mode, { ...this.state, imageUrl }, token);
    }
  }

  render() {
    const { price, name, imageUrl, description } = this.state;

    return (
      <form id="product-form" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input required name="name" onChange={this.handleChange} value={name} />

        <label htmlFor="price">Price:</label>
        <input
          required
          name="price"
          onChange={this.handleChange}
          value={price}
        />

        <label htmlFor="imageUrl">Add an image Url:</label>
        <input name="imageUrl" onChange={this.handleChange} value={imageUrl} />

        <label htmlFor="description">Add a description:</label>
        <input
          name="description"
          onChange={this.handleChange}
          value={description}
        />

        <button type="submit">Submit</button>
        <Link to="/admin">Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createProd: (mode, product, token) => {
    if (mode === 'edit') {
      dispatch(updateProduct(product, token));
    } else {
      dispatch(createProduct(product, token));
    }
  },
});

export default connect(null, mapDispatchToProps)(AddProduct);
