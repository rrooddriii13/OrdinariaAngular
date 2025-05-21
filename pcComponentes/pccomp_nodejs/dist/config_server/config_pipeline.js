"use strict";
//modulo typescript q exporta una unica funcion q recibe como parametro el servidor web express
//a configurar su pipeline (funciones middleware)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = config_pipeline;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const endpointsZonaCliente_1 = __importDefault(require("./config_routing/endpointsZonaCliente"));
const endpointsZonaTienda_1 = __importDefault(require("./config_routing/endpointsZonaTienda"));
const endpointsGEOAPI_1 = __importDefault(require("./config_routing/endpointsGEOAPI"));
function config_pipeline(serverWeb) {
    serverWeb.use(express_1.default.json({ limit: '50mb' })); //<--- si no pones un limite grande, y se adjuntan en el http-body payloads muy pesados te salta excepcion: PayloadTooLargeError: request entity too large...pq por defecto tiene limite de menos de 1mg, asi lo amplias!!! https://betterstack.com/community/questions/fix-request-entity-too-large/
    serverWeb.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
    serverWeb.use((0, cors_1.default)());
    //midleware de enrutamiento...servicio REST-GATEWAY
    serverWeb.use('/api/zonaCliente', endpointsZonaCliente_1.default);
    serverWeb.use('/api/zonaTienda', endpointsZonaTienda_1.default);
    serverWeb.use('/api/GEOAPI', endpointsGEOAPI_1.default);
}
