var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var users  = require('./routes/users');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('[eq');
    console.log(users);
});

// app.get('/users', (req, res) => {
//     res.send('[eq');
//     console.log(users);
// });

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, () => {
    console.log('Джигурда');
})