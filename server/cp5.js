const express = require("express"),
  bodyParser = require('body-parser'),
  nodeMailer = require('nodemailer'),
  mongoose = require('mongoose');
  
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

// let orders = [];
// let id = 0;

//Connect to the database
mongoose.connect('mongodb://localhost:27017/cp5', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Mongo scheme for orders
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  number: String,
  date: String,
});

//Mongo model for orders
const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', auth.verifyToken, User.verify, async (req, res) => {
  const order = new Order({
    user: req.user,
    name: req.body.name,
    number: req.body.number,
    date: req.body.date
  });
  try {
    await order.save();
    res.send(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/orders/all', async (req, res) => {
  try {
    let orders = await Order.find().sort({date: -1, number: -1}).populate('user');
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/orders', auth.verifyToken, User.verify, async (req, res) => {
  try {
    let orders = await Order.find({ 
      user: req.user 
    }).sort({date: -1, number: -1});
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/orders/:id', auth.verifyToken, User.verify, async (req, res) => {
  try {
    let order = await Order.findOne({
      _id: req.params.id
    });
    order.user = req.user;
    order.name = req.body.name;
    order.number = req.body.number;
    order.date = req.body.date;
    await order.save();
    res.send(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/orders/:id', auth.verifyToken, User.verify, async (req, res) => {
  try {
    await Order.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/send-email', (req, res) => {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'oitavstudent@gmail.com',
        pass: 'oitemail'
      }
  });
  let mailOptions = {
      to: 'd_goodsell@byu.edu',
      subject: req.body.subject,
      html: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  res.sendStatus(200);
});

app.use("/api/users", users.routes);

let server = app.listen(3015, () => {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
