"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modulo de codigo de nodejs q exporta un objeto ROUTER de express para definir endpoints y funciones middleware q 
//se ejecutan cuando se alcanzan dichos endpoints o rutas de zonaTienda
//para crear este objeto Router se usa el metodo .Router() de express
const express_1 = __importDefault(require("express"));
const zonaTiendaController_1 = __importDefault(require("../controllers/zonaTiendaController"));
const routingTienda = express_1.default.Router();
routingTienda.get('/RecuperarCategorias', zonaTiendaController_1.default.RecuperarCategorias);
routingTienda.get('/RecuperarProductos', zonaTiendaController_1.default.RecuperarProductos);
routingTienda.get('/RecuperarProducto', zonaTiendaController_1.default.RecuperarProducto);
exports.default = routingTienda;
