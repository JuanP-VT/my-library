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
    app.listen(5000, () => {
      console.log('App is listening');
    });
  },
);

// Register New User Endpoint
app.post('/users', async (req, res) => {
  try {
    // Check if request Name is not empty
    if (req.body.name === '' || req.body.name === null || req.body.name === undefined) {
      return res.json({ message: 'Name field must be submitted' });
    }
    // Check if request password is more than 4 characters
    if (req.body.password.length <= 4) {
      return res.json({ message: 'Password must be longer than 4 characters' });
    }
    // Return error message if username already exist in Database
    // Search for username in the Database
    const findUser = await User.find({ name: req.body.name });
    // If username is in database return error message
    if (findUser.length > 0) {
      res.json({ message: 'Username Already Exist' });
      return;
    }
    // Hash password
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    // create new user in DB
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    user.save();
    res.json(user);
  } catch {
    res.status(500).send();
  }
});
