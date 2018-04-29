const models = require('../db/index');
const express = require('express');
const router = express.Router();

router.get('/', ( req, res ) => {
    models.user.findAll()
               .then(user => {
                   res.json(user);
               });
});

router.post('/create', (req, res) => {
    const body = req.body;

    models.user.create(body)
    .then(() => res.send('ok'))
    .catch( e => res.status(400).send(e.message))   
    
})

module.exports = router;