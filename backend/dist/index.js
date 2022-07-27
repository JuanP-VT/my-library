"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema_1 = require("./schema/userSchema");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(`mongodb+srv://admin:${process.env.mongo_pass}@cluster0.thrkg.mongodb.net/?retryWrites=true&w=majority`, () => {
    console.log('Connected to Database');
    app.listen(5000, () => {
        console.log('App is listening');
    });
});
// Register New User Endpoint
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const findUser = yield userSchema_1.User.find({ name: req.body.name });
        // If username is in database return error message
        if (findUser.length > 0) {
            res.json({ message: 'Username Already Exist' });
            return;
        }
        // Hash password
        const hashedPass = yield bcrypt_1.default.hash(req.body.password, 10);
        // create new user in DB
        const user = new userSchema_1.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        });
        user.save();
        res.json(user);
    }
    catch (_a) {
        res.status(500).send();
    }
}));
