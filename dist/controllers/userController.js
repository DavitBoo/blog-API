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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const router = express_1.default.Router();
// Create user route
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if user already exists in the data base
        const userExists = yield user_1.User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }
        //encrypt the password
        const salt = bcrypt_1.default.genSaltSync(10);
        const hash = bcrypt_1.default.hashSync(password, salt);
        // console.log(hash);
        // Create a new user 
        const newUser = new user_1.User({ username, password: hash });
        yield newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// Login user route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { username, password } = {username:'David', password:'password'};
    const { username, password } = req.body;
    const user = yield user_1.User.findOne({ username });
    jsonwebtoken_1.default.sign({ user }, 'secretkey', { expiresIn: 30 }, (err, token) => {
        res.json({
            token
        });
    });
}));
// // Login user route
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user: IUser | null = await User.findOne({ username });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   // Sign the token with a specific callback
//   const signCallback: SignCallback = (err, token) => {
//     if (err) {
//       return res.status(500).json({ message: "Error signing token" });
//     }
//     const nonNullableToken: string = token || '';
//     // Use the JwtToken type for the token response
//     const tokenResponse: JwtToken = { token: nonNullableToken };
//     res.json(tokenResponse);
//   };
//   // Use the JwtPayload type for the payload
//   jwt.sign({ user } as JwtPayload, 'secretkey', signCallback);
// });
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find();
        res.json(users);
    }
    catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
