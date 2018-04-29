const models = require('../db/index');
const express = require('express');
const router = express.Router();

router.get('/', ( req, res ) => {
    models.room.findAll()
               .then(room => {
                   res.json(room);
               });
})

module.exports = router;