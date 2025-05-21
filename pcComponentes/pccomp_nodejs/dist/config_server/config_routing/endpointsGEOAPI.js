"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//modulo de codigo de nodejs q exporta un objeto ROUTER de express para definir endpoints y funciones middleware q 
//se ejecutan cuando se alcanzan dichos endpoints o rutas de GEOAPI
//para crear este objeto Router se usa el metodo .Router() de express
const express_1 = __importDefault(require("express"));
const GeoApiController_1 = __importDefault(require("../controllers/GeoApiController"));
const routingGEOAPI = express_1.default.Router();
routingGEOAPI.get('/GetProvincias', GeoApiController_1.default.GetProvincias);
routingGEOAPI.get('/GetMunicipios', GeoApiController_1.default.GetMunicipios);
exports.default = routingGEOAPI;
