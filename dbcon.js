
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361',
  password        : '',
  database        : 'cs361'
});

module.exports.pool = pool;
