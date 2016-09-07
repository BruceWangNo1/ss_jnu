module.exports.render=function(req, res){
	console.log('req.session.user '+req.session.user);
	res.render('index', {
		title: 'SS-Panel',
		user: JSON.stringify(req.session.user)
	});
};