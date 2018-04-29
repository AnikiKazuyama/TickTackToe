var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');

var users  = require('./routes/users');
const rooms = require('./routes/rooms');
const login = require('./routes/login');

var app = express();

app.use(bodyParser.urlencoded());

app.use('/rooms', rooms);
app.use('/users', users);
app.use('/login', login);

app.get('/', (req, res) => {
    res.send('Добро пожаловать на наш проект SurtAniki, мы вам всегда не рады!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, () => {
    console.log('Джигурда');
})