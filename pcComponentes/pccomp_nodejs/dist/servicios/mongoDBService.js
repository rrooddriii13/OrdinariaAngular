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
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const clienteMongoDB = new mongodb_1.MongoClient(process.env.URL_MONGODB);
const MongoDBService = {
    LoginRegistro: function (op, login, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                clienteMongoDB.connect();
                switch (op) {
                    case "Login":
                        console.log('en login en mongoDBService...', op, email, password);
                        let _cuentaCli = yield clienteMongoDB.db(process.env.DB_MONGODB)
                            .collection('clientes')
                            .findOne({ 'cuenta.email': email });
                        if (!_cuentaCli)
                            throw new Error('no existe cliente con ese email...');
                        if (!_cuentaCli.cuenta.cuentaActiva)
                            throw new Error('cuenta no esta activada...');
                        if (!bcrypt_1.default.compareSync(password, _cuentaCli.cuenta.password))
                            throw new Error('password incorrecta...');
                        return _cuentaCli;
                    case "Registro":
                        let _nuevoCliente = {
                            nombre: 'Default',
                            apellidos: 'Default',
                            genero: '',
                            nif: '00000000A',
                            telefono: '000 00 00 00',
                            fechaNacimiento: new Date(Date.now()).getTime(),
                            cuenta: { login, email, password: bcrypt_1.default.hashSync(password, 10), cuentaActiva: false, imagenAvatar: '' },
                            direcciones: [],
                            pedidos: [],
                        };
                        let _resInsert = yield clienteMongoDB.db(process.env.DB_MONGODB)
                            .collection('clientes')
                            .insertOne(_nuevoCliente);
                        if (!_resInsert.insertedId)
                            throw new Error('error al insertar datos del cliente');
                        return _nuevoCliente;
                    default:
                        return null;
                }
            }
            catch (error) {
                console.log('error en mongodb en login/registro...', error);
                return null;
            }
        });
    },
    RecuperarCategorias: function (pathCat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _patron;
                switch (pathCat) {
                    case 'raices':
                        _patron = /^[0-9]{1,}$/;
                        break;
                    default:
                        _patron = new RegExp(`^${pathCat}(-[0-9]{1,}){1,}`);
                        break;
                }
                clienteMongoDB.connect();
                let _cats = yield clienteMongoDB.db(process.env.DB_MONGODB)
                    .collection('categorias')
                    .find({ path: { $regex: _patron } })
                    .toArray();
                return _cats;
            }
            catch (error) {
                console.log('error al recupoerar categorias...', error);
                return [];
            }
        });
    },
    RecuperarProductos: function (pathCat) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                clienteMongoDB.connect();
                let filtro = { categoria: { $regex: new RegExp(`^${pathCat}(-[0,9]{1,})*`, 'i') } }; //si la declaras la variable como Filter<IProducto> no te pilla el valor de $regex
                let _prods = yield clienteMongoDB.db(process.env.DB_MONGODB)
                    .collection('productos')
                    .find(filtro)
                    .toArray();
                return _prods;
            }
            catch (error) {
                console.log('error al recuperar productos...', error);
                return [];
            }
        });
    },
    RecuperarProducto: function (codProd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                clienteMongoDB.connect();
                let _prod = yield clienteMongoDB.db(process.env.DB_MONGODB)
                    .collection('productos')
                    .findOne({ 'codArticulo': codProd });
                if (!_prod)
                    throw new Error('no existe ningun producto con ese codigo articulo:' + codProd);
                return _prod;
            }
            catch (error) {
                console.log('error al recuperar productos...', error);
                return null;
            }
        });
    },
    GetProvincias: function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                clienteMongoDB.connect();
                let _provs = yield clienteMongoDB.db(process.env.DB_MONGODB).collection('provincias').find().toArray();
                return _provs;
            }
            catch (error) {
                console.log('error en servicio MongoDbService obteniendo provincias...', error);
                return [];
            }
        });
    },
    GetMunicipios: function (CPRO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                clienteMongoDB.connect();
                let _munis = yield clienteMongoDB.db(process.env.DB_MONGODB).collection('municipios').find({ CPRO }).toArray();
                return _munis;
            }
            catch (error) {
                console.log('error en servicio MongoDbService obteniendo provincias...', error);
                return [];
            }
        });
    },
};
exports.default = MongoDBService;
