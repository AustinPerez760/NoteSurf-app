require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utilities');

app.use(express.json());

app.use(
	cors({
		origin: '*',
	})
);

app.get('/', (req, res) => {
	res.send({ data: 'hello' });
});

// Create Account
app.post('/create-account', async (req, res) => {
	const { fullName, email, password } = req.body;

	if (!fullName || !email || !password) {
		return res.status(400).send({ message: 'Please fill all fields' });
	}

	const isUser = await User.findOne({ email: email });

	if (isUser) {
		return res.json({
			error: true,
			message: 'User already exists',
		});
	}

	const user = new User({
		fullName,
		email,
		password,
	});

	await user.save();

	const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
	});

	return res.json({
		error: false,
		user,
		accessToken,
		message: 'User created successfully',
	});
});

app.listen(8000);

module.exports = app;
