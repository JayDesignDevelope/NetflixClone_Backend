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
const user_1 = __importDefault(require("../models/user"));
const user_2 = __importDefault(require("../controllers/user"));
const jwt_1 = require("../middlewares/jwt");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        success: true,
        data: 'Welcome to Roseflix backend!'
    });
}));
router.post('/signup', user_2.default.onCreateUser);
router.post('/signin', jwt_1.encode, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = yield user_1.default.getUserById(req.userId);
    return res.status(200).json({
        success: true,
        authorization: req.authToken,
        data: { userDetails }
    });
}));
router.post('/users/checkAvailability', user_2.default.onCheckAvailability);
router.post('/users/upsertProfile', jwt_1.decode, user_2.default.onUpsertProfile);
router.post('/users/deleteProfile', jwt_1.decode, user_2.default.onDeleteProfile);
exports.default = router;
//# sourceMappingURL=index.js.map