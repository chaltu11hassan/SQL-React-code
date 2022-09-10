const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "hellokitty", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

///////////////////////////////////////////////////////////

//* below code is for mysql2, sequalize above

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "hellokitty",
// });

// module.exports = pool.promise();

///////////////////////////////////////////////////////////
