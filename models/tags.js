const sequelize = require("sequelize");
const db = require("../db");

const tags =  db.define("tags",{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
        allowNull: false
    },
    tag: {
        type: sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: false
    }
});

module.exports = tags;