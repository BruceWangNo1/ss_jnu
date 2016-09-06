var crypto = require('crypto');
var connection = require(process.cwd()+'/config/mysql.js')();
var functions = require(process.cwd() + '/app/controllers/function_defined.js');
var transporter = require(process.cwd()+'/config/nodemailer.js');
var nodemailer = transporter.transporter();

exports.signin = function(req, res){
	console.log(req.body.email);

	connection.query('SELECT * FROM user WHERE user.email = \''+req.body.email+'\'', function(err, rows, result){
		console.log(err);
		if(rows.length != 0){
			console.log(rows[0].pass);
			console.log(req.body.password);
			var hashed_password = crypto.createHash('md5').update(req.body.password).digest('hex');
			console.log(hashed_password);
			//console.log(result);
			console.log(hashed_password == rows[0].pass);

			if (hashed_password == rows[0].pass) {
				console.log('username ' + rows[0].user_name);
				req.session.user = rows[0].user_name;
				//req.user = rows[0].user_name;
				console.log(req.user);
				res.status(200).end();
			} else {
				res.status(500).send("Password Incorrect.");
			}
		} else {
			res.status(500).send("Email has not been registered.")
		}
		
	});
};

exports.signup = function(req, res, next){
	var port = 0;
	console.log('validate email: ' + functions.validateEmail(req.body.email));
	connection.query('SELECT * FROM user WHERE user.email='+'\''+req.body.email+'\' '+' OR user.user_name='+'\''+req.body.username+'\'', function(err,rows, result){
		console.log(rows.length);
		if(rows.length == 1){
			if(rows[0].user_name == req.body.username)
				res.status(500).send("Username has already been registered. Please choose another username.");
			else
				res.status(500).send("Email has already been registered. If you forget your password, please try to reset your password.");
		} else if (rows.length == 2){
			res.status(500).send("Username and Email have already been registered. If you forget your password, please try to reset your password.");	
		} else {
			var hashed_password = crypto.createHash('md5').update(req.body.password).digest('hex');
			var transfer_enable = 5368709120;
			var port_password = functions.generateRandomString(6);

			connection.query('SELECT MAX(port) AS max FROM user', function(err, rows, result){
				port = rows[0].max + 1;
				//console.log(rows);
				//console.log(port);
				connection.query('INSERT INTO user \
					(user_name, email, pass, passwd, transfer_enable, port) VALUES (\''
					+req.body.username+'\', \''+req.body.email+'\', \''+hashed_password+'\', \''
					+port_password+'\','+transfer_enable+','+port+')', function(err,rows, result){
						console.log(err);
						console.log(rows);
						console.log(result);
						if(err == null){
							req.session.user = req.body.username;
							res.redirect('/');
						}
					});
			});
		}
	});
};
exports.signout = function(req, res, next){
	console.log('signout username ' + req.user);
	req.session.destroy();
	res.redirect('/');
};

exports.reset_password = function(req, res, next){
	connection.query('SELECT * FROM user WHERE user.email='+'\''+req.body.email+'\' '+'AND user.user_name='+'\''+req.body.username+'\'', function(err, rows, result){
		console.log(req.body.username + req.body.email);
		console.log(err);
		console.log('rows '+ rows);
		if(rows.length != 1){
			res.status(500).send("Email and username do not match. Please make sure.");
		} else {
			var reset_password = functions.generateRandomString(6);
			connection.query('UPDATE user SET reset_password_token = \'' + reset_password+'\' '+ 'WHERE user.email = \''+ req.body.email+'\'', function(err, rows, result){
				console.log(err);
				console.log(rows);
				console.log(result);

				var mailOptions = transporter.mailOptions();
				mailOptions.to = req.body.email;
				mailOptions.subject = 'SS-Panel Password Reset Token';
				mailOptions.html = '<p>You password reset token is ' + reset_password 
					+'.</p> <p>If you have not tried to reset your password, please ignore this email.</p>';

				nodemailer.sendMail(mailOptions, function(err, response){
					console.log('sendmail err ' + err);
					console.log('sendmail response ' + response);
					if(err == null){
						res.status(200).send('Password reset token has been sent to your email. Please check.');
					} else {
						res.status(500).send('Something went wrong. Please try to reset your password later or contact the administrator.')
					}
				});
			});
		}
	});
}

exports.reset_password_with_token = function(req, res){
	console.log('req.body.email ' + req.body.email);
	connection.query('SELECT * FROM user WHERE user.email = \''+req.body.email+'\'', function(err, rows, result){
		console.log(err);
		if(rows.length != 0){
			console.log(rows[0].pass);
			console.log(req.body.password);
			var hashed_password = crypto.createHash('md5').update(req.body.password).digest('hex');
			console.log(hashed_password);
			var username = rows[0].user_name;
			//console.log(result);
			//console.log(hashed_password == rows[0].pass);
			console.log(rows[0].reset_password_token);
			console.log(req.body.token);

			if(rows[0].reset_password_token == req.body.token){
				connection.query('UPDATE user SET pass = \'' + hashed_password+'\', '+'reset_password_token = '+'NULL'+ ' WHERE user.email = \''+ req.body.email+'\'', function(err, rows, result){
					console.log('err '+ err);
					if(!err){
						req.session.user = username;
						res.status(200).send("Password Reset Successful");
					}
				});
			} else {
				res.status(500).send('Reset Token Incorrect');
			}
		} else {
			res.status(500).send('Email has not been registered yet.');
		}
	});
};

exports.information = function(req, res){
	console.log('req.session.username ' + req.session.username);
	connection.query('SELECT * FROM user WHERE user.user_name = \'' + req.session.user + '\'', function(err, rows, result){
		console.log(rows[0]);
		var result = rows[0];
		console.log('result ' + result);
		delete rows[0].pass;
		delete result.pass;
		res.json(rows[0]);
	});
};
exports.node_list = function(req, res){
	connection.query('SELECT * FROM ss_node', function(err, rows, result){
		res.json(rows);
	});
};
exports.requiresLogin = function(req, res, next){
	console.log('require login');
	if(!req.session.user){
		return res.status(401).send('Please sign in.');
	}
	next();
};