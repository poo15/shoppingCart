const Sequelize = require('sequelize');

const db = new Sequelize('shopdb', 'root', 'password', {
  host: 'localhost',
  dialect: 'sqlite', 
  storage: __dirname + "/shopdb.db",
  pool: {
      min: 0,
      max: 5,
  }
})


const Vendor = db.define('vendors', {
  id :{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: Sequelize.STRING,
      allowNull:false,
  }
})

const User = db.define('users', {
  id :{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: Sequelize.STRING,
      allowNull:false,
  }
})

const Product = db.define('products', {
  id :{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: Sequelize.STRING,
      allowNull:false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0.0
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})


const Cart = db.define('carts', {
  id :{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  qty :{
    type :Sequelize.INTEGER,
    defaultValue: 1
  }
})

Vendor.hasMany(Product, {onDelete: 'cascade'})
Product.belongsTo(Vendor)

Product.hasMany(Cart, {onDelete: 'cascade'})
Cart.belongsTo(Product)

User.hasMany(Cart)
Cart.belongsTo(User)

db.sync()
.then(()=> console.log("Db is created"))
.catch((err) => console.log(err))

exprots = module.exports={
    Vendor, User, Product, Cart
}




