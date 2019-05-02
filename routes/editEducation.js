const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const currentUser = Parse.User.current();
	const Education = Parse.Object.extend('Education');
	const education = new Education();

	if (currentUser) {
		education
			.save({
				...req.body,
				user: currentUser
			})
			.then(response => res.json({ success: true, message: 'edit successful', id: response.id }))
			.catch(error => console.log(error));
	} else res.json({ success: false, message: 'unauthorized' });
});

module.exports = router;
