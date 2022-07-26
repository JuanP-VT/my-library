import { Book } from './bookSchema';
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  numOfPages: Number,
  url: String,
  isRead: Boolean,
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  books: Array<typeof bookSchema>,
});

export const User = mongoose.model('user', userSchema);
