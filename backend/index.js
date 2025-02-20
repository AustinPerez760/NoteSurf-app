require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const Note = require('./models/note.model');

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
		expiresIn: '300m',
	});

	return res.json({
		error: false,
		user,
		accessToken,
		message: 'User created successfully',
	});
});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send({ message: 'Please fill all fields' });
	}

	const userInfo = await User.findOne({ email: email });

	if (!userInfo) {
		return res.status(400).json({
			message: 'User not found',
		});
	}

	if (userInfo.email == email && userInfo.password == password) {
		const user = { user: userInfo };
		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '300m',
		});

		return res.json({
			error: false,
			email,
			accessToken,
			message: 'User logged in successfully',
		});
	} else {
		return res.status(400).json({
			error: true,
			message: 'Invalid credentials',
		});
	}
});

// Get User
app.get('/get-user', authenticateToken, async (req, res) => {
	const { user } = req.user;

	const isUser = await User.findOne({ _id: user._id });

	if (!isUser) {
		return res.sendStatus(401);
	}

	return res.json({
		user: {
			fullName: isUser.fullName,
			email: isUser.email,
			_id: isUser._id,
			createdOn: isUser.createdOn,
		},
		message: '',
	});
});

// Add Note
app.post('/add-note', authenticateToken, async (req, res) => {
	const { title, content, tags } = req.body;
	const { user } = req.user;

	if (!title || !content) {
		return res
			.status(400)
			.json({ error: true, message: 'Please fill all fields' });
	}

	try {
		const note = new Note({
			title,
			content,
			tags: tags || [],
			userId: user._id,
		});

		await note.save();

		return res.json({
			error: false,
			note,
			message: 'Note added successfully',
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

// Edit Note
app.put('/edit-note/:noteId', authenticateToken, async (req, res) => {
	const noteId = req.params.noteId;
	const { title, content, tags, isPinned } = req.body;
	const { user } = req.user;

	if (!title && !content && !tags) {
		return res
			.status(400)
			.json({ error: true, message: 'No changes provided' });
	}

	try {
		const note = await Note.findOne({ _id: noteId, userId: user._id });

		if (!note) {
			return res.status(404).json({
				error: true,
				message: 'Note not found',
			});
		}

		if (title) note.title = title;
		if (content) note.content = content;
		if (tags) note.tags = tags;
		if (isPinned) note.isPinned = isPinned;

		await note.save();

		return res.json({
			error: false,
			note,
			message: 'Note updated successfully',
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

// Get All Notes
app.get('/get-all-notes/', authenticateToken, async (req, res) => {
	const { user } = req.user;

	try {
		const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

		return res.json({
			error: false,
			notes,
			message: 'All notes fetched successfully',
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

// Delete Note
app.delete('/delete-note/:noteId', authenticateToken, async (req, res) => {
	const noteId = req.params.noteId;
	const { user } = req.user;

	try {
		const note = await Note.findOne({ _id: noteId, userId: user._id });

		if (!note) {
			return res.status(404).json({
				error: true,
				message: 'Note not found',
			});
		}

		await Note.deleteOne({ _id: noteId, userId: user._id });

		return res.json({
			error: false,
			message: 'Note deleted successfully',
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

// Update isPinned Value
app.put('/update-note-pinned/:noteId', authenticateToken, async (req, res) => {
	const noteId = req.params.noteId;
	const { isPinned } = req.body;
	const { user } = req.user;

	try {
		const note = await Note.findOne({ _id: noteId, userId: user._id });

		if (!note) {
			return res.status(404).json({
				error: true,
				message: 'Note not found',
			});
		}

		note.isPinned = isPinned || false;

		await note.save();

		return res.json({
			error: false,
			note,
			message: 'Note updated successfully',
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

// Search Notes
app.get('/search-notes/', authenticateToken, async (req, res) => {
	const { user } = req.user;
	const { query } = req.query;

	if (!query) {
		return res.status(400).json({
			error: true,
			message: 'Please provide a search query',
		});
	}

	try {
		const matchingNotes = await Note.find({
			userId: user._id,
			$or: [
				{ title: { $regex: new RegExp(query, 'i') } },
				{ content: { $regex: new RegExp(query, 'i') } },
			],
		});
		return res.json({
			error: false,
			notes: matchingNotes,
			message: 'Search successfull',
		});
	} catch (error) {
		return res.status(500).json({
			error: true,
			message: 'Internal server error',
		});
	}
});

app.listen(8000);

module.exports = app;
