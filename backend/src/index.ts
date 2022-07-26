import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './schema/userSchema';
dotenv.config();

const app: Express = express();
app.use(express.json());
mongoose.connect(
  `mongodb+srv://admin:${process.env.mongo_pass}@cluster0.thrkg.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log('Connected to Database');
  },
);

// Register New User Endpoint
app.post('/users', async (req, res) => {
  try {
    // Return error if username already exist
    // Search for username in the Database
    const findUser = await User.find({ name: req.body.name });
    // If username is in database return error message
    if (findUser.length > 0) {
      res.json({ message: 'Username Already Exist' });
      return;
    }
  } catch {
    res.status(500).send('');
  }
});
app.listen(5000);
