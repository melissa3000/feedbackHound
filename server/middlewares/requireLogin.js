module.exports = (req, res, next) => {
	// make sure user is logged in
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in' });
	}
	// if user is logged in, proceed to next steps
	next();
};