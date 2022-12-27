const sequelize = require("sequelize");
const db = require("../db");

const comments =  db.define("comments",{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
        allowNull: false
    },
    comment: {
        type: sequelize.STRING,
        allowNull: false
    },
    post_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: false
    }
});

module.exports = comments;