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
            res.json({status: room.enter(user) ? "Success" : "Error"});
        } else 
            res.status(403).json({status: "Error"});
    });

    router.get('/leave', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({status: room.leave(user) ? "Success" : "Error"});
        } else 
            res.status(403).json({status: "Error"});
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

    io.on('connection', socket => {
        socket.on('enterServer', () => {
            console.log(socket.request.isAuthenticated());
            io.sockets.emit('enterClient', room);
        })
    
        socket.on('leaveServer', () => {
            io.sockets.emit('leaveClient', room);
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
      });

    return router; 
});