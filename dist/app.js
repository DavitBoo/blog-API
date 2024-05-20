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
const userController_1 = __importDefault(require("./controllers/userController"));
const postController_1 = __importDefault(require("./controllers/postController"));
const commentController_1 = __importDefault(require("./controllers/commentController"));
const labelController_1 = __importDefault(require("./controllers/labelController"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const app = (0, express_1.default)();
//parece que funciona pero creo que debería establecer el Cache-control en el header
// ! generaba error con la verificación del token. Al expirar el token antes me estaba volviendo loco haciendo pruebas
// let cache = apicache.middleware;
// app.use(cache('5 minutes'));
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
// ! using cors in this way I am allowing conections from everywhere, usefull for development, but not for producto
app.use((0, cors_1.default)());
//! in close future replace for something like:
// app.use(cors({
//   origin: 'https://tu-dominio.com'  
// }));
//set up mongoose
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
if (!process.env.MONGODB_URI) {
    throw new Error("Missing mongo URI environment variable");
}
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(mongoDB);
        console.log("connection to DB success");
    });
}
app.use("/api", userController_1.default);
app.use("/api", postController_1.default);
app.use("/api", commentController_1.default);
app.use("/api", labelController_1.default);
app.get("/", (req, res) => {
    res.json("Bienvenido a la API de mi blog!!!");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
