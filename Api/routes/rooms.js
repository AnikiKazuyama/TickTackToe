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
            io.sockets.emit('enterServer');
        } else 
            res.status(403).json({status: "Error"});
    });

    router.get('/leave', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({status: room.leave(user) ? "Success" : "Error"});
            io.sockets.emit('leaveServer');
        } else 
            res.status(403).json({status: "Error"});
    });
    
    router.get('/getState', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({
                status: "Success",
                room: room
            })
        } else 
            res.status(403).json({status: "Error"});
    });
    
    router.get('/', ( req, res ) => {
        models.room.findAll()
                   .then(room => {
                       res.json(room);
                   });
    })

    io.on('connection', socket => {
        socket.on('enterServer', () => {
          io.sockets.emit('enterClient', room)
        })
    
        socket.on('leaveServer', () => {
            io.sockets.emit('leaveClient', room)
          })
    
        socket.on('disconnect', () => {
          console.log('user disconnected')
        })
      });

    return router; 
});