const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING, 
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        }, 
        password: DataTypes.STRING
    });

    User.prototype.getPublicData = function() {
        return ({
            id: this.id,
            name: this.name,
            email: this.email
        });
    }

    User.prototype.validPassword = function(password) {
        return bcrypt.compare(password, this.password).then((res) => res);
    }

    User.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => { 
                throw new Error(); 
            });
    });

    return User;
  };

