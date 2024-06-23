
const sequelize = require ('./db.js');
const DataTypes = require ('sequelize');

const User = sequelize.define('user', {
    name: { type: DataTypes.STRING(255), allowNull: false },
    age: { type: DataTypes.INTEGER(), allowNull: false },
}, {
    timestamps: false
});

module.exports = User;