const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;

// Config files
dotenv.config();

// DB connection
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('Connected to mongo DB')
);

// Import routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const birthdayRoute = require('./routes/birthdays');

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/auth', authRoute);
app.use('/api/birthdays', birthdayRoute);
app.use('/api/users', usersRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
