const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  shippingInfo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  billingInfo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
