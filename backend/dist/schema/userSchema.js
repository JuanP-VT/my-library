"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    name: String,
    author: String,
    numOfPages: Number,
    url: String,
    isRead: Boolean,
});
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    books: (Array),
});
exports.User = mongoose_1.default.model('user', userSchema);
