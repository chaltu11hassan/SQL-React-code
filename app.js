const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");

const sequalize = require("./util/database");
// const db = require("./util/database");

const Product = require("./models/product");

const Cart = require("./models/cart");

const User = require("./models/user");

const CartItem = require("./models/cart-item");

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

//npm start doesnt run this, it only
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//* syncs models to data tables and define relationships
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

//one user has many products: optional
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User); //optional
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequalize
  //   .sync({ force: true }) //force drops any existing table
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .then((user) => {
    if (!user) {
      //create user
      return User.create({ name: "Chaltu", email: "test@test.com" });
    }
    // return Promise.resolve(user);
    return user;
  })
  .then((user) => {
    // console.log(user);
    //create user cart
    user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
