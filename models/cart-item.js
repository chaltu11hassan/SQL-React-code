const Sequelize = require("sequelize");

const sequalize = require("../util/database");

//cart belongs to one user but holds many products!
const CartItem = sequalize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
