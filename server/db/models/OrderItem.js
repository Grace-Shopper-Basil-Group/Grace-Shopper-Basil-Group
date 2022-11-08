const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      require: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = OrderItem;
