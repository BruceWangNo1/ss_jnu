var nodemailer = require('nodemailer');
var mailAuth = require(process.cwd()+'/config/credentials/credentials.js');

var transporter = nodemailer.createTransport({
	service: 'Hotmail',
	pool: true,
	auth: {
		user: mailAuth.auth.user,
		pass: mailAuth.auth.pass
	}
});
var mailOptions = {
	from: mailAuth.auth.user
};

exports.transporter = function(){
	return transporter;
};
exports.mailOptions = function(){
	return mailOptions;
}