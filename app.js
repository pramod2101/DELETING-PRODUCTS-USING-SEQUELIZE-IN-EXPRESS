const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product=require('./models/product')
const User=require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraint:true, OnDelete:'CASCADE'})
User.hasMany(Product)

sequelize
  .sync({force:true})
  .then(result=>{
    return User.findbyId
  })
  .then(user=>{
    if(!user){
      User.create({name:'test', email:'test@test.ccom'})
    }
    return user;
  })
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
