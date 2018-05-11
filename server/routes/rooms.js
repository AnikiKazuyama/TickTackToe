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
        } else 
            res.status(403).json({status: "error"});
        io.sockets.emit('updateServer');
    });

    router.get('/leave', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({status: room.leave(user) ? "success" : "error"});
            io.socket.emit('updateServer');
        } else 
            res.status(403).json({status: "error"});

        io.sockets.emit('updateServer');
        
    });
    
    router.get('/state', (req, res) => {
        res.json({
            status: "Success",
            room: room
        })
    });
    
    router.get('/', ( req, res ) => {
        models.room.findAll()
                   .then(room => {
                       res.json(room);
                   });
    })

    const socket = io.on('connection', socket => {
        socket.on('updateServer', () => {
            console.log(socket.request.isAuthenticated());
            io.sockets.emit('updateClient', room);
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })

        socket.on('getState', (callback) => {
            callback(room);
        })
      });

    return router; 
});