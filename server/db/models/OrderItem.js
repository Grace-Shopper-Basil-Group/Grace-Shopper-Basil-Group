const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    required: true,
    allowNull: true,
    // validate: {
    //   required: true,
    // },
  },
  price: {
    type: Sequelize.FLOAT,
    // allowNull: false,
  },
});

module.exports = OrderItem;
