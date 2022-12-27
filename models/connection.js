const sequelize = require("sequelize");
const db = require("../db");

const connection =  db.define("connection",{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
        allowNull: false
    },
    db_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    db_password: {
        type: sequelize.STRING,
        allowNull: false
    },
    db_username: {
        type: sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: false
    }
});

module.exports = connection;