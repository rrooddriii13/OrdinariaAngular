import {Filter, InsertOneResult, MongoClient} from 'mongodb';
import bcrypt from 'bcrypt';
import ICuenta from '../modelos/interfaces_orm/ICuenta';
import ICliente from '../modelos/interfaces_orm/ICliente';
import { ICategoria } from '../modelos/interfaces_orm/ICategoria';
import { IProducto } from '../modelos/interfaces_orm/IProducto';
import { IProvincia } from '../modelos/interfaces_orm/IProvincia';
import { IMunicipio } from '../modelos/interfaces_orm/IMunicipio';

const clienteMongoDB=new MongoClient(process.env.URL_MONGODB!);

const MongoDBService:any={
    LoginRegistro: async function (op: string, login: string, email: string, password: string): Promise<ICliente|null> {
        try {
            clienteMongoDB.connect();
            
            switch(op){
                case "Login":
                    console.log('en login en mongoDBService...', op,email,password);
                    let _cuentaCli:ICliente|null=await clienteMongoDB.db(process.env.DB_MONGODB)
                                                                    .collection<ICliente>('clientes')
                                                                    .findOne({'cuenta.email':email});
                    
                    if (! _cuentaCli) throw new Error('no existe cliente con ese email...'); 
                    if ( ! _cuentaCli.cuenta.cuentaActiva) throw new Error('cuenta no esta activada...');
                    if (! bcrypt.compareSync(password, _cuentaCli.cuenta.password))  throw new Error('password incorrecta...');

                    return _cuentaCli;

                case "Registro":
                    let _nuevoCliente:ICliente={
                        nombre: 'Default',
                        apellidos: 'Default',
                        genero: '',
                        nif: '00000000A',
                        telefono: '000 00 00 00',
                        fechaNacimiento: new Date(Date.now()).getTime(),
                        cuenta: { login, email, password: bcrypt.hashSync(password,10), cuentaActiva:false, imagenAvatar:''},
                        direcciones: [],
                        pedidos: [],
                    }
                    let _resInsert:InsertOneResult<ICliente>=await clienteMongoDB.db(process.env.DB_MONGODB)
                                                                                .collection<ICliente>('clientes')
                                                                                .insertOne(_nuevoCliente);
                    if( ! _resInsert.insertedId ) throw new Error('error al insertar datos del cliente');
                    
                    return _nuevoCliente;
                
                default:
                    return null;
            }

            

        } catch (error) {
            console.log('error en mongodb en login/registro...', error);
            return null;
        }
    },
    RecuperarCategorias: async function(pathCat:string):Promise<ICategoria[]>{
        try {
            let _patron:RegExp;
            switch (pathCat) {
                case 'raices':
                    _patron=/^[0-9]{1,}$/;
                    break;
            
                default:
                    _patron=new RegExp(`^${pathCat}(-[0-9]{1,}){1,}`)
                    break;
            }

            clienteMongoDB.connect();
            let _cats:ICategoria[]=await clienteMongoDB.db(process.env.DB_MONGODB)
                                                        .collection<ICategoria>('categorias')
                                                        .find( { path: {$regex: _patron}})
                                                        .toArray();
            return _cats;

        } catch (error) {
            console.log('error al recupoerar categorias...', error);
            return [];
        }
    },
    RecuperarProductos: async function(pathCat:string): Promise<IProducto[]>{
        try {
            clienteMongoDB.connect();
            let filtro:{ [key:string]: any}={ categoria:  { $regex: new RegExp(`^${pathCat}(-[0,9]{1,})*`,'i')} }; //si la declaras la variable como Filter<IProducto> no te pilla el valor de $regex

            let _prods:IProducto[]=await clienteMongoDB.db(process.env.DB_MONGODB)
                                                        .collection<IProducto>('productos')
                                                        .find( filtro )  
                                                        .toArray();
            return _prods;          

        } catch (error) {
            console.log('error al recuperar productos...', error);
            return [];
        }
    },
    RecuperarProducto: async function(codProd:string): Promise<IProducto|null>{
        try {
            clienteMongoDB.connect();

            let _prod:IProducto|null=await clienteMongoDB.db(process.env.DB_MONGODB)
                                                        .collection<IProducto>('productos')
                                                        .findOne( { 'codArticulo': codProd } );
            if(! _prod) throw new Error('no existe ningun producto con ese codigo articulo:' + codProd);
            return _prod;          

        } catch (error) {
            console.log('error al recuperar productos...', error);
            return null;
        }
    },
    GetProvincias: async function(): Promise<IProvincia[]>{
        try {
            clienteMongoDB.connect();
            let _provs:IProvincia[]=await clienteMongoDB.db(process.env.DB_MONGODB).collection<IProvincia>('provincias').find().toArray();
            return _provs;

        } catch (error) {
            console.log('error en servicio MongoDbService obteniendo provincias...', error);
            return [];
        }
    },
    GetMunicipios: async function(CPRO:string): Promise<IMunicipio[]>{
        try {
            clienteMongoDB.connect();
            let _munis:IMunicipio[]=await clienteMongoDB.db(process.env.DB_MONGODB).collection<IMunicipio>('municipios').find({CPRO}).toArray();
            return _munis;

        } catch (error) {
            console.log('error en servicio MongoDbService obteniendo provincias...', error);
            return [];
        }
    },
}
export default MongoDBService;
