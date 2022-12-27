const Sequelize = require("sequelize");

let conn = function(dbname) {
    const sequelize = new Sequelize(dbname, 'root', null, {
        host: 'localhost',
        dialect: 'mysql'
    });
    return sequelize
}


module.exports = conn;
