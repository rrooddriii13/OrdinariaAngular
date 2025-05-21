"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modulo de codigo de nodejs q exporta un objeto ROUTER de express para definir endpoints y funciones middleware q 
//se ejecutan cuando se alcanzan dichos endpoints o rutas de zonaCliente
//para crear este objeto Router se usa el metodo .Router() de express
const express_1 = __importDefault(require("express"));
const zonaClienteController_1 = __importDefault(require("../controllers/zonaClienteController"));
const routingCliente = express_1.default.Router();
routingCliente.post('/LoginRegistro', zonaClienteController_1.default.LoginRegistro);
exports.default = routingCliente;
