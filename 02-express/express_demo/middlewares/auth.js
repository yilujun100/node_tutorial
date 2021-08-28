module.exports = function auth(req, res, next) {
	console.log(`req.query: ${req.query}`);
	if (req.query.username === 'laoyang') {
		next();
	} else {
		res.end('please go away');
	}
};
