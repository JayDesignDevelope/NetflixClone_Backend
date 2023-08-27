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
const user_1 = __importDefault(require("../models/user"));
exports.default = {
    onGetAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_1.default.getUsers();
            return res.status(200).json({ success: true, users });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    }),
    onGetUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.getUserById(req.params.id);
            return res.status(200).json({ success: true, user });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    }),
    onCheckAvailability: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { value, type } = req.body;
            const isAvailable = yield user_1.default.checkAvailability(value, type);
            return res.status(200).json({ success: true, isAvailable });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    }),
    onUpsertProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { newProfile } = req.body;
            const updatedUser = yield user_1.default.upsertProfile(req.userId, newProfile);
            return res.status(200).json({ success: true, user: updatedUser });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    }),
    onDeleteProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { profileId } = req.body;
            const updatedUser = yield user_1.default.deleteProfile(req.userId, profileId);
            return res.status(200).json({ success: true, user: updatedUser });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    }),
    onCreateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDetails = req.body;
            userDetails.profiles[0].avatar = `Avatar_0${Math.floor(Math.random() * 7) + 1}.png`;
            yield user_1.default.createUser(userDetails);
            return res.status(201).json({ success: true });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    }),
    onDeleteUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.deleteUserById(req.params.id);
            return res.status(200).json({
                success: true,
                message: `Deleted user: ${user.email}.`
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, error: error.message });
        }
    })
};
//# sourceMappingURL=user.js.map