const models = require('../db/index');
const express = require('express');
const router = express.Router();
const User = require('../RAM/User');
const Room = require('../RAM/Room');

module.exports = (function(io) { 

    const room = new Room();
    
    router.get('/enter', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({status: room.enter(user) ? "success" : "error"});
            io.sockets.emit('updateClient', room);
        } else 
            res.status(403).json({status: "error"});
    });

    router.get('/leave', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({status: room.leave(user) ? "success" : "error"});
            io.sockets.emit('updateClient', room);
        } else 
            res.status(403).json({status: "error"});
    });

    const socket = io.on('connection', socket => {
        socket.on('updateServer', () => {
            console.log(socket.request.isAuthenticated());
            io.sockets.emit('updateClient', room);
        })

        socket.on('getDataServer', () => {
            socket.emit('getDataClient', room)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
      });

    return router; 
});