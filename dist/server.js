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
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const index_1 = __importDefault(require("./routes/index"));
const constants_1 = require("./constants");
const PORT = process.env.PORT || 8080;
const corsOptions = { credentials: false };
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default(corsOptions));
const server = http_1.createServer(app);
config_1.connectDb().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const URL_PREFIX = '/api/v1';
    app.use(`${URL_PREFIX}`, index_1.default);
    app.use('*', (req, res) => {
        return res.status(404).json({
            success: false,
            message: constants_1.ERROR_MESSAGES.ENDPOINT_NOT_FOUND
        });
    });
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}));
//# sourceMappingURL=server.js.map