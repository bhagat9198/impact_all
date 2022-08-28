const express = require('express');
const cors = require('cors');
const logger = require('fancy-log');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { postSignup, postSignin, getUserDetails, getLogout } = require('./controller/auth');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
// app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.post('/signup', postSignup);
app.post('/signin', postSignin)
app.get('/user-details', getUserDetails)
app.get('/logout', getLogout)
app.use('/', (req, res, next) => {
  return res.status(200).json({
    status: true,
    data: 'Welcome to ImpactAll backend'
  });
})
app.use((req, res, next) => {
  return res.status(200).json({
    status: false,
    data: 'Invalid route'
  });
})

mongoose.connect(MONGODB_URI).then(async() => {
  return app.listen(PORT)
}).then(() => {
  logger('Server started at PORT :: ', PORT)
}).catch(error => {
  logger('server start error :: ', error);
  logger.error('Error in starting the server :: ', error.message)
})
