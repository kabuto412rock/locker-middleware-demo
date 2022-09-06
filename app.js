var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lockerRouter = require('./routes/lcoker')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/locker', lockerRouter)

const lockerGuard = require('./middlewares/locker-guard')
app.use(lockerGuard)
app.use('/users', usersRouter);

module.exports = app;
