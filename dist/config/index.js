"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const path_1 = require("path");
dotenv_1.config({ path: path_1.resolve(__dirname, 'config.env') });
mongoose_1.default.connection.on('connected', () => {
    console.log('DB connected..');
});
mongoose_1.default.connection.on('reconnected', () => {
    console.log('DB reconnected..');
});
mongoose_1.default.connection.on('error', (error) => {
    console.log('DB connection error..', error);
    mongoose_1.default.disconnect();
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('DB disconnected..');
});
const connectDb = () => {
    return mongoose_1.default.connect(`mongodb+srv://jayvinay:UU9ZI5VLErErHdRQ@sandbox.fzoac.mongodb.net/?retryWrites=true&w=majority`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
};
exports.connectDb = connectDb;
//# sourceMappingURL=index.js.map