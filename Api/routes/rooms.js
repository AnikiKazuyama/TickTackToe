const models = require('../db/index');
const express = require('express');
const router = express.Router();
const User = require('../RAM/User');

module.exports = (function(room) { 
    
    router.get('/connect', (req, res) => {
        if(req.isAuthenticated()) {
            const user = new User(req.user.id, req.user.name);
            res.json({status: room.connect(user) ? "Success" : "Error"})
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

    return router; 
});