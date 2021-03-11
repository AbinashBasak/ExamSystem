// exports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');

const { MONGO_URI } = require('./config/server');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.once('open', () => console.log('db connect')).on('error', (err) => console.log(err));

// create app
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/auth/user', userRouter);

module.exports = app;
