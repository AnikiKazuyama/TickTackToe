const models = require('../db/index');
const express = require('express');
const router = express.Router();
const User = require('../RAM/User');
const Room = require('../RAM/Room');

module.exports = (function(io) { 

    let rooms = {
        1: new Room(),
        2: new Room(), 
        3: new Room(),
        4: new Room(),
        5: new Room()
    }

    const room = new Room();
    
    router.get('/enter', (req, res) => {
        // if(req.isAuthenticated()) {
        //     const user = new User(req.user.id, req.user.name);
        //     res.json({status: room.enter(user) ? "success" : "error"});
        //     io.sockets.emit('updateClient', room);
        // } else 
        //     res.status(403).json({status: "error"});

        console.log(req.user.getRoomID());
    });

    router.get('/leave', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({status: room.leave(user) ? "success" : "error"});
            io.sockets.emit('updateClient', room);
        } else 
            res.status(403).json({status: "error"});
    });

io.on('connection', socket => {

    socket.on('enterRoom', (id, callback) => {
        if(socket.request.isAuthenticated() && !socket.request.user.getRoomID() && rooms[id] && rooms[id].getPlayersCount() < 2) {
            rooms[id].enter(socket.request.user.getPublicData());
            socket.request.user.enterRoom(id);
            io.sockets.emit('updateClient', rooms);
            io.sockets.emit('updateRoomClient', id, rooms[id]);
            callback(true);
        } else 
            callback(false);
    })

    socket.on('leaveRoom', (id, callback) => {
        if(socket.request.isAuthenticated() && rooms[id]) {
            rooms[id].leave(socket.request.user.getPublicData());
            socket.request.user.leaveRoom();
            io.sockets.emit('updateClient', rooms);
            io.sockets.emit('updateRoomClient', id, rooms[id]);
            callback();
        } else 
            callback();
    })

    socket.on('updateServer', () => {
        io.sockets.emit('updateClient', rooms);
    })

    socket.on('getDataServer', () => {
        socket.emit('getDataClient', rooms);
    })

    socket.on('getRoomDataServer', (id) => {
        socket.emit('getRoomDataClient', rooms[id]);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});

    return router; 
});