require('dotenv').config();

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

// ROUTES
app.use('/api/users', require('./routes/users.routes'));

app.listen(process.env.PORT, () => {
	console.log('Server running on the port ' + process.env.PORT);
});
