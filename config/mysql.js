var mysql=require('mysql');
var credentials=require('./credentials/credentials.js');

module.exports=function(){
	var pool=mysql.createPool({
		connectionLimit: 10,
		host: credentials.mysql.host,
		user: credentials.mysql.user,
		password: credentials.mysql.password,
		database: credentials.mysql.database
	});

	return pool;
};