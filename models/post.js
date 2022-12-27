const sequelize = require("sequelize");
const db = require("../db");

const posts =  db.define("post",{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.STRING,
        allowNull: false
    },
   
    createdAt: {
        type: sequelize.DATE,
        allowNull: false
    }
});

module.exports = posts;