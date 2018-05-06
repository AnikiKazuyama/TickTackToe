const models = require('../db/index');
const express = require('express');
const passport = require('passport');
const router = express.Router();


router.post('/', (req, res, next) => {
    const body = req.body;

    const password = body.password;
    const email = body.email;

    passport.authenticate('local', 
        function(error, user, info){
            return error 
            ? next(error)
            : user 
                ? req.logIn(user, function(err){
                    return err
                    ? console.log(err.message)
                    : res.status(200).json({status: "Success"});
                })
                : res.status(400).json({status: "Error"});
        }
    )(req, res, next);

    // models.user.findOne({ where: { email: body.email } })
    //     .then(user => {
    //         console.log(user.validPassword(body.password));
    //         if (user)
    //         user.validPassword(body.password).then(isCurrect => {
    //             if (isCurrect)
    //                 res.send('ok');
    //             else
    //                 res.status(400).send('Incorrect password');
    //         })
    //      else 
    //         res.status(400).send('User not found');
    //     });
});

module.exports = router;