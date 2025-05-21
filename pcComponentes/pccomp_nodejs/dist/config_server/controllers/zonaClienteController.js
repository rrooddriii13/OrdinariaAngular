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
const jwtService_1 = __importDefault(require("../../servicios/jwtService"));
const ClienteController = {
    LoginRegistro: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { op, login, email, password } = req.body;
                let _resp = yield mongoDBService_1.default.LoginRegistro(op, login, email, password);
                if (!_resp)
                    throw new Error('error en acceso MONGODB ante login/registro');
                let _tokens = jwtService_1.default.GenerarJWT({ email, idCliente: _resp._id, nombre: _resp.nombre, apellidos: _resp.apellidos }, '1h', true);
                res.status(200).send({
                    codigo: 0,
                    mensaje: op == 'Login' ? 'Login usuario ok...' : 'Registro usuario OKS!!!',
                    datos: {
                        datosCliente: _resp,
                        tokens: { accessToken: op == 'Login' ? _tokens[0] : '', refreshToken: op == 'Login' ? _tokens[1] : '' }
                    }
                });
            }
            catch (error) {
                console.log('error durante login o registro cliente...', error);
                res.status(200).send({ codigo: 1, mensaje: 'error durante login o registro cliente...' + error });
            }
        });
    }
};
exports.default = ClienteController;
