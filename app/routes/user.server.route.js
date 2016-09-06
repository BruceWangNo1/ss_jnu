var user=require('../controllers/user.server.controller.js');
var index = require('../controllers/index.server.controller.js');

module.exports=function(app){
	app.route('/api/signup')
	.post(user.signup);

	app.route('/api')
	.post(user.signin);
	//app.post('/api', user.signin);
	app.get('/user_center', user.requiresLogin, user.information);
	
	app.get('/node_list', user.requiresLogin, user.node_list);

	app.get('/signout', user.signout);
	
	app.route('/api/reset_password')
	.post(user.reset_password);

	app.route('/api/reset_password_with_token')
	.post(user.reset_password_with_token);
};