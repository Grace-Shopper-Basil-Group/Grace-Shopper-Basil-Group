const Sequelize = require("sequelize");
const db = require("../db");

const OrderItem = db.define("orderItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
  },
});

module.exports = OrderItem;
