const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

// API routes
app.get('/users', async (req, res) => {
  res.json(await User.find());
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: 'User not found' });
});

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (user) res.json(user);
    else res.status(404).json({ error: 'User not found' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) res.json({ message: 'User deleted' });
  else res.status(404).json({ error: 'User not found' });
});

// Serve static React files from build folder
app.use(express.static(path.join(__dirname, 'build')));

// For any other route, send React's index.html
app.get(/^\/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
