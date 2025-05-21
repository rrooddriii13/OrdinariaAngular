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
const mongoDBService_1 = __importDefault(require("../../servicios/mongoDBService"));
const GeoApiController = {
    GetProvincias: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _provs = yield mongoDBService_1.default.GetProvincias();
                res.status(200).send({ codigo: 0, mensaje: ' provincias oksss', datos: _provs });
            }
            catch (error) {
                console.log('error a la hora de obtener provincias...', error);
                res.status(200).send({ codigo: 1, mensaje: 'error a la hora de obtener provincias...' });
            }
        });
    },
    GetMunicipios: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //hay q pasarle por GET el parametro codProv o codigo provincia (en bbdd es CPRO)
                let _munis = yield mongoDBService_1.default.GetMunicipios(req.query.codProv);
                res.status(200).send({ codigo: 0, mensaje: ' municipios oksss', datos: _munis });
            }
            catch (error) {
                console.log('error a la hora de obtener provincias...', error);
                res.status(200).send({ codigo: 1, mensaje: 'error a la hora de obtener municipios...' });
            }
        });
    },
};
exports.default = GeoApiController;
