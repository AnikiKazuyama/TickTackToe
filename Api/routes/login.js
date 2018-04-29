const models = require('../db/index');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const body = req.body;

    const password = body.password;
    const email = body.email;

    models.user.findOne({ where: { email: body.email } })
        .then(user => {
            console.log(user.validPassword(body.password));
            if (user)
            user.validPassword(body.password).then(isCurrect => {
                if (isCurrect)
                    res.send('ok');
                else
                    res.status(400).send('Incorrect password');
            })
         else 
            res.status(400).send('User not found');
        });
});

module.exports = router;