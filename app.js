//app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
const database = require('./database/db');
const roomRouter = require('./routes/roomRouter');
const bookingRouter=require('./routes/bookingRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT','DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomRouter);
app.use('/bookings', bookingRouter )
// Allow requests from any origin (you can customize this if needed)

// Other middleware and route configurations

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
