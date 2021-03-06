const models = require('../db/index');
const express = require('express');
const passport = require('passport');
const router = express.Router();


router.post('/', (req, res, next) => {
    const body = req.body;

    const password = body.password;
    const email = body.email;

    passport.authenticate('local', 
        function(error, user, info) {
            return error 
            ? next(error)
            : user 
                ? req.logIn(user, function(err) {
                    return err
                    ? res.status(500).send(err.message)
                    : res.json({
                        status: "success", 
                        user: user.getPublicData()
                    });
                })
                : res.json({status: "error"});
        }
    )(req, res, next);
});


module.exports = router;