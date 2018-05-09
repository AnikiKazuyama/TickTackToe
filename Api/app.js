const express      = require('express');
const session      = require('express-session');
const path         = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');

const passport     = require('passport');
require('./config/passportStrategy')(passport);

const users        = require('./routes/users');
const rooms        = require('./routes/rooms');
const login        = require('./routes/login');
const logout       = require('./routes/logout');
const isAuth      = require('./routes/isAuth');

const sessionMiddleware = session({ 
    secret: 'SECRET',
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        HttpOnly: false,
        Path: '/'
    }
 });

const app = express();

const io = require('socket.io')(app).use(function(socket, next){
    // Wrap the express middleware
    sessionMiddleware(socket.request, {}, next);
});

app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
 
app.use('/rooms', rooms);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/isauth', isAuth);

app.get('/', (req, res) => {
    res.send('Добро пожаловать на наш проект SurtAniki, мы вам всегда не рады!');
});

io.on('connection', socket => {
    socket.on('isAuthServer', () => {
      console.log(socket.request)
      io.sockets.emit('isAuthClient', socket.request.user)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  });


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

http.listen(3000, () => {
    console.log('Джигурда');
})

