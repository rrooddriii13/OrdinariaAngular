"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); //<---- lee el fichero .env y crea variables de entorno accesibles con process.env.
const express_1 = __importDefault(require("express"));
const config_pipeline_1 = __importDefault(require("./config_server/config_pipeline"));
const app = (0, express_1.default)();
(0, config_pipeline_1.default)(app);
app.listen(3003, () => console.log('--- servidor WEB EXPRESS corriendo en puerto 3003 ---'));
