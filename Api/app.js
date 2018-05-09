const express      = require('express');
const session      = require('express-session');
const path         = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require('cors');
const Room         = require('./RAM/Room');

const passport     = require('passport');
const room = new Room();

const users        = require('./routes/users');
const rooms        = require('./routes/rooms')(room);
const login        = require('./routes/login');
const logout       = require('./routes/logout');
const isAuth      = require('./routes/isAuth');

const app = express();

const http = require('http').Server(app)
const io = require('socket.io')(http);

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
 
app.use('/api/rooms', rooms);
app.use('/api/users', users);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/isauth', isAuth);

app.get('/', (req, res) => {
    res.send('Добро пожаловать на наш проект SurtAniki, мы вам всегда не рады!');
});

io.on('connection', socket => {
    socket.on('enterServer', () => {
        console.log(room);
      io.sockets.emit('enterClient', room)
    })

    socket.on('leaveServer', () => {
        io.sockets.emit('leaveClient', room)
      })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

http.listen(3000, () => {
    console.log('Джигурда');
})