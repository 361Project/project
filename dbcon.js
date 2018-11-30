//mySQL connection
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs361_blanchlu',
  password: '6053',
  database: 'cs361_blanchlu'
});

module.exports.pool = pool;
