const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const api = new ParseServer({
	databaseURI: process.env.DATABASE_URI,
	serverURL: process.env.SERVER_URL,
	appId: process.env.APP_ID,
	masterKey: process.env.MASTER_KEY,
	appName: 'HIT Alumni',
	publicServerURL: process.env.SERVER_URL
});

const options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard(
	{
		apps: [
			{
				serverUrl: process.env.SERVER_URL,
				appId: process.env.APP_ID,
				masterKey: process.env.MASTER_KEY,
				appName: 'HIT Alumni'
			}
		],
		users: [
			{
				user: process.env.USER,
				pass: process.env.PASS
			}
		],
		trustProxy: 1
	},
	options
);

const mountPath = process.env.MOUNT_PATH;
module.exports = app = express();

//Middleware
app.use(cors());
app.use(mountPath, api);
app.use('/dashboard', dashboard);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
	fileUpload({
		limits: { fileSize: 10 * 1024 * 1024 } // 10MB file limit
	})
);

//Templating Middleware
//Set the default views directory to views folder
app.set('views', path.join(__dirname, 'views'));

//Set the view engine to ejs
app.set('view engine', 'ejs');

//Routes
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/uploadCv', require('./routes/uploadCv'));
app.use('/uploadAvatar', require('./routes/uploadAvatar'));
app.use('/editPersonalDetails', require('./routes/editPersonalDetails'));
app.use('/editEducationDetails', require('./routes/editEducation'));
app.use('/editContactDetails', require('./routes/editContact'));
app.use('/editSkills', require('./routes/editSkills'));

const port = process.env.PORT || 3000;
const httpServer = require('http').createServer(app);
httpServer.listen(port, () => console.log(`Alumni running on port ${port}. \n`));
