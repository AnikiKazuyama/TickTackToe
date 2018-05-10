module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('room', {
        name: DataTypes.STRING
    });

    return Room;
}

