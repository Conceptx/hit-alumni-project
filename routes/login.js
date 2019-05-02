const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { username, password } = req.body;
	Parse.User.enableUnsafeCurrentUser();

	Parse.User.logIn(username, password)
		.then(user => {
			Parse.User.become(user.sessionToken)
				.then(() => res.json({ success: true, message: 'login successful', user }))
				.catch(error => console.log(error));
		})
		.catch(error => console.log(error));
});

module.exports = router;
