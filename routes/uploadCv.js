const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	const { name, data, mimetype } = req.files.cv;
	const file = new Parse.File(name, { base64: data.toString('base64') }, mimetype);
	file
		.save()
		.then(cv => res.json({ success: true, message: 'cv uploaded', url: cv.url() }))
		.catch(error => console.log(error));
});

module.exports = router;
