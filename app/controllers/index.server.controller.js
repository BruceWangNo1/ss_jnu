module.exports.render=function(req, res){
	console.log('req.session.user '+req.session.user);
	res.render('index', {
		title: 'JNU Student Information Query',
		user: JSON.stringify(req.session.user)
	});
};