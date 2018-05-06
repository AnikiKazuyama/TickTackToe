const express      = require('express');
const session      = require('express-session');
const path         = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');

const passport     = require('passport');

const users        = require('./routes/users');
const rooms        = require('./routes/rooms');
const login        = require('./routes/login');
const logout       = require('./routes/logout');
const isAuth      = require('./routes/isAuth');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ 
    secret: 'SECRET',
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        HttpOnly: false,
        Path: '/'
    }
 }));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passportStrategy')(passport);
 
app.use('/rooms', rooms);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/isauth', isAuth);

app.get('/', (req, res) => {
    res.send('Добро пожаловать на наш проект SurtAniki, мы вам всегда не рады!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000, () => {
    console.log('Джигурда');
})