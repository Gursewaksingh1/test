let mysql = require("mysql2");
function construct_pool(db_name) {      // DB Construction Function
    pool  = mysql.createPool({
       connectionLimit : 150,
       host     : 'localhost',
       user     : 'root',
       password : '',
       database : db_name
    });
    return pool;
  }
  let common_db = construct_pool("user");
//   var connectors = {                      // DB Connectors
//       'common_db': construct_pool('common_db'),
//       'tenant_db_1': construct_pool('tenant_db_1'),
//       'tenant_db_2': construct_pool('tenant_db_2'),
//       'tenant_db_3': construct_pool('tenant_db_3'),
//       'tenant_db_4': construct_pool('tenant_db_4')
//   }

module.exports = {common_db,construct_pool};