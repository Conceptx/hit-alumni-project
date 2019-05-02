const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { name, data, mimetype } = req.files.avatar;

	const file = new Parse.File(name, { base64: data.toString('base64') }, mimetype);
	file
		.save()
		.then(avatar => res.json({ success: true, message: 'avatar uploaded', url: avatar.url() }))
		.catch(error => console.log(error));
});

module.exports = router;
