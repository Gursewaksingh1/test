const sequelize = require("sequelize");
const db = require("../db");

const user = db.define("users",{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize.DATE,
        allowNull: false
    },
});

module.exports = user;