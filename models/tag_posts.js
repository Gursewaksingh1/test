const sequelize = require("sequelize");
const db = require("../db");

const tagPosts =  db.define("post_tags",{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER,
        allowNull: false
    },
    post_id: {
        type: sequelize.STRING,
        allowNull: false
    },
    tag_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        allowNull: false
    }
});

module.exports = tagPosts;