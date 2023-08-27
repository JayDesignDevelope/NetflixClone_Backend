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
const mongoose_1 = require("mongoose");
const nanoid_1 = require("nanoid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("../constants");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profiles: [
        {
            _id: {
                type: String,
                default: () => nanoid_1.nanoid()
            },
            name: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });
userSchema.statics.createUser = function (userDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = yield bcrypt_1.default.hash(userDetails.password, 10);
            userDetails.password = hash;
            return yield this.create(userDetails);
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.statics.checkAvailability = function (value, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingUser = type === 'email' ? yield this.findOne({ email: value }) : yield this.findOne({ phone: value });
            return existingUser ? false : true;
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.statics.getUserById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield this.findOne({ _id: id }, { password: 0 });
            if (!user)
                throw { error: constants_1.ERROR_MESSAGES.USER_NOT_FOUND };
            return user;
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.statics.getUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield this.find({}, { password: 0 });
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.statics.upsertProfile = function (id, newProfile) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield this.findOne({ _id: id }, { password: 0 });
            if (!user)
                throw { error: constants_1.ERROR_MESSAGES.USER_NOT_FOUND };
            if (newProfile._id) {
                const profileIndex = user.profiles.findIndex((profile) => profile._id === newProfile._id);
                user.profiles[profileIndex] = newProfile;
            }
            else {
                user.profiles.push(Object.assign({}, newProfile));
            }
            return yield user.save();
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.statics.deleteProfile = function (id, profileId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield this.findOne({ _id: id }, { password: 0 });
            if (!user)
                throw { error: constants_1.ERROR_MESSAGES.USER_NOT_FOUND };
            const profileIndex = user.profiles.findIndex((profile) => profile._id === profileId);
            user.profiles.splice(profileIndex, 1);
            return yield user.save();
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.statics.findByLogin = function (login) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield this.findOne({ $or: [{ phone: login }, { email: login }] });
            return user;
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.statics.deleteUserById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield this.findByIdAndDelete(id);
        }
        catch (error) {
            throw error;
        }
    });
};
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.js.map