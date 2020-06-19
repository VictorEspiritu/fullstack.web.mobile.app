var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Session= require('express-session');
var FileStore = require('session-file-store')(Session);

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://172.17.0.2:27017/conFusion2';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter= require('./routes/dishRouter');
const promoRouter= require('./routes/promoRouter');
const leaderRouter= require('./routes/leaderRouter');

const connect = mongoose.connect(url);

connect.then((db) =>{
    console.log('Connected correctly to server');
}, (err) => {
    console.log('ERROR:', err);
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('09342-65643-78942-45478'));
app.use(Session({
    name: 'session-id',
    secret: '09342-46788-34567-23345',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

function auth (req, res, next){
    console.log('Auth Headers: ', req.headers);
    console.log('Sesion: ', req.session);

    if(!req.session.user){
       var authHeader = req.headers.authorization;

        if(!authHeader){
            var err = new Error('You are not authentication!');
            err.status = 401;

            res.setHeader('WWW-Authenticate', 'Basic');
            return next(err);
        }

        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];

        if(username == 'admin' && password == 'password'){
            req.session.user='admin';
            next();
        }else{
            var err = new Error('You are not authorization!');
            err.status = 403;

            return next(err);
        }
    }else{
        if(req.session.user == 'admin'){
            next();
        }else{
            var err = new Error('You are not authorization with cookies!');
            err.status = 403;

            return next(err);
        }
    }

}

app.use(auth);


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

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
