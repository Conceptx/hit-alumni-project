const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { name, studentId, email, dob, gender, password } = req.body;
	const user = new Parse.User();
	user
		.signUp({
			username: name,
			studentId,
			email,
			dob,
			gender,
			password
		})
		.then(newuser => res.json({ success: true, message: 'account created', user: newuser }))
		.catch(error => console.log(error));
});

module.exports = router;
