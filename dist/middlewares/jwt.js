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
exports.decode = exports.encode = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const constants_1 = require("../constants");
const encode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByLogin(req.body.email);
        if (user) {
            const matches = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (matches) {
                const authToken = jsonwebtoken_1.default.sign({
                    userId: user._id
                }, process.env.SECRET_KEY);
                console.log('Auth', authToken);
                req.authToken = authToken;
                req.userId = user._id;
                next();
            }
            else {
                return res.status(401).json({ success: false, message: constants_1.ERROR_MESSAGES.UNAUTHORIZED });
            }
        }
        else {
            throw new Error(constants_1.ERROR_MESSAGES.UNAUTHORIZED);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
});
exports.encode = encode;
const decode = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ success: false, message: constants_1.ERROR_MESSAGES.NO_TOKEN });
    }
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(accessToken, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: error.message });
    }
};
exports.decode = decode;
//# sourceMappingURL=jwt.js.map