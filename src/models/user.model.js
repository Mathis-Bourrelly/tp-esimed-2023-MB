const {sequelize} = require("./db-sqlite");
const {DataTypes} = require('sequelize');

exports.User = sequelize.define('User', {
    id: {primaryKey: true, type: DataTypes.INTEGER},
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
});