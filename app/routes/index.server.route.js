var index=require('../controllers/index.server.controller');
//user=require('../controllers/user.server.controller');

module.exports=function(app){
	app.get('/', index.render);
};