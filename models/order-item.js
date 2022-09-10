const Sequelize = require("sequelize");

const sequalize = require("../util/database");

//cart belongs to one user but holds many products!
const OrderItem = sequalize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;
