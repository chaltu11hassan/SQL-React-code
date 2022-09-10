const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequalize = require("./util/database");
// const db = require("./util/database");

const Product = require("./models/product");

const product = require("./models/product");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { userInfo } = require("os");

//* Testing code with DUMMY data
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log(result[0], result[1]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//* syncs models to data tables and define relationships
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

//one user has many products: optional
User.hasMany(Product);

sequalize
  //.sync({ force: true }) //force drops any existing table
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .the((user) => {
    if (!user) {
      return User.create({ name: "Chaltu", email: "test@test.com" });
    }
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(3000);
