import mongoose, { mongo } from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  numOfPages: Number,
  url: String,
  isRead: Boolean,
});

export const Book = mongoose.model('book', bookSchema);
