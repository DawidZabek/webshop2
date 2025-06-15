const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
console.log(' MONGO_URI z .env:', process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 8000;
const User = require('./models/User');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error(' MongoDB connection error:', err));

app.use('/api/products', require('./routes/products'));

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Użytkownik już istnieje' });
  
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Zarejestrowano' });
  });
  
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: 'Nieprawidłowe dane logowania' });
  
    const token = jwt.sign(
        { userId: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
    
      res.json({ token });
    });

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

