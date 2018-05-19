const models = require('../db/index');
const express = require('express');

const router = express.Router();

const User = require('../RAM/User');
const Room = require('../RAM/Room');

const uuid = require('uuid/v4');

module.exports = (function(io) { 

    let rooms = {}

    let players = {};

    io.on('connection', socket => {
        console.log('user connected to соскет');
        socket.on('enterRoom', (id, callback) => {
            if(socket.request.isAuthenticated() && (!players[socket.request.user.id] || rooms[id].isExist(socket.request.user.getPublicData())) && rooms[id] && (rooms[id].getPlayersCount() < 2 || rooms[id].isExist(socket.request.user.getPublicData()))) {
                players[socket.request.user.id] = true;
                rooms[id].enter(socket.request.user.getPublicData());
                socket.request.user.enterRoom(id);
                io.sockets.emit('updateClient', rooms);
                socket.broadcast.to(id).emit('updateRoomClient', rooms[id]);
                socket.join(id);
                callback(true);
            } else 
                callback(false);
        })

        socket.on('leaveRoom', (id, callback) => {
            if(socket.request.isAuthenticated() && rooms[id].isExist(socket.request.user)) {
                delete players[socket.request.user.id];
                rooms[id].leave(socket.request.user.getPublicData());
                if (rooms[id].getPlayersCount() == 0)
                    delete rooms[id];
                socket.request.user.leaveRoom();
                io.sockets.emit('updateClient', rooms);
                socket.broadcast.to(id).emit('updateRoomClient', rooms[id]);
                socket.leave(socket.room);
                callback();
            } else 
                callback();
        })

        socket.on('createRoom', (name, callback) => {
            if(socket.request.isAuthenticated() && !players[socket.request.user.id]){
                let roomId = null;

                do {
                    roomId = uuid().split('-').join('');
                } while(rooms[roomId]);

                rooms[roomId] = new Room(name);
                rooms[roomId].enter(socket.request.user.getPublicData());
                socket.join(roomId);

                players[socket.request.user.id] = true;

                callback(roomId);

                io.sockets.emit('updateClient', rooms);
            }
        });

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