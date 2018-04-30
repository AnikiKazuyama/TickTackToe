const models = require('../db/index');
const express = require('express');
const router = express.Router();

router.get('/', ( req, res ) => {
    if (req.isAuthenticated())
        models.user.findAll()
               .then(user => {
                   res.json(user);
               });
    else
        res.status(403).send('Непутю');
});

router.post('/create', (req, res) => {
    models.user
        .create({ name: req.body.name, email: req.body.email, password: req.body.password })
        .then(() => res.send('ok'))
        .catch( e => res.status(400).send(e.message))   
    
})

module.exports = router;