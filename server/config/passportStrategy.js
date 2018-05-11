// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const model = require('../db');

module.exports = function (passport){

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        model.user.findById(id).then(user => {
            if (user)
                done(null, user); // этот юзер будет доступен в req.user
            else
                done(user.errors, null);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password'
    }, function(username ,password, done){
        model.user.findOne({ where: { email: username } })
            .then( user => {
                // console.log('passport auth');
                if(user){
                    // console.log('passport user found');
                    user.validPassword(password)
                        .then( isCorrect => {
                            isCorrect
                            ? done(null, user)
                            : done(null, false, { message: 'Incorrect password' })
                        })
                } else {
                    // console.log('passport user not found');
                    done(null, false, { message: 'Incorrect email' });
                }
                    
            });
    }));
}