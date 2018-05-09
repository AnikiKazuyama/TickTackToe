const models = require('../db/index');
const express = require('express');
const router = express.Router();

const Room = require('../RAM/Room');
const User = require('../RAM/User');

const room = new Room();


router.get('/connect', (req, res) => {
    if(req.isAuthenticated()) {
        const user = new User(req.user.id, req.user.name);
        res.json({status: room.connect(user) ? "Success" : "Error"})
        console.log(room);
    } else 
        res.status(403).json({status: "Error"});
});

router.get('/', ( req, res ) => {
    models.room.findAll()
               .then(room => {
                   res.json(room);
               });
})

module.exports = router;