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
const TiendaController = {
    RecuperarCategorias: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let _listaCats = yield mongoDBService_1.default.RecuperarCategorias(req.query.pathCat);
            console.log('lista categorias...', _listaCats);
            res.status(200).send({ codigo: 0, mensaje: `categorias ${req.query.pathCat} recuperadas ok...`, datos: _listaCats });
        });
    },
    RecuperarProductos: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let _listaProds = yield mongoDBService_1.default.RecuperarProductos(req.query.pathCat);
            //console.log('lista productos...', _listaProds);
            res.status(200).send({ codigo: 0, mensaje: `productos de cat: ${req.query.pathCat} recuperadas ok...`, datos: _listaProds });
        });
    },
    RecuperarProducto: function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let _prod = yield mongoDBService_1.default.RecuperarProducto(req.query.codProd);
            console.log('producto con codigo ', req.query.codProd, _prod);
            res.status(200).send({ codigo: 0, mensaje: `producto con codArticulo: ${req.query.codProd} recuperado ok...`, datos: _prod });
        });
    },
};
exports.default = TiendaController;
