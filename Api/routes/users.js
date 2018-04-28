const models = require('../db/index');
const express = require('express');
const router = express.Router();

router.get('/', ( req, res ) => {
    models.user.findAll()
               .then(user => {
                   res.json(user);
               });
})

module.exports = router;