require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

// CORS
app.use(cors());

// READING AND PARSEO OF THE BODY
app.use(express.json());

// BD
dbConnection();

// PUBLIC DIRECTORY
app.use(express.static('public'));

// ROUTES
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/hospitals', require('./routes/hospitals.routes'));
app.use('/api/doctors', require('./routes/doctors.routes'));
app.use('/api/all', require('./routes/searches.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));
app.use('/api/login', require('./routes/auth.routes'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
	console.log('Server running on the port ' + process.env.PORT);
});
