import { NextFunction,Response,Request } from "express";
import MongoDBService from '../../servicios/mongoDBService';
import JWTService from '../../servicios/jwtService';
import ICliente from "../../modelos/interfaces_orm/ICliente";

const ClienteController:any={
    LoginRegistro: async function(req:Request, res:Response, next:NextFunction){
        try {
            const {op,login,email,password}=req.body;
            
            let _resp:ICliente|null=await MongoDBService.LoginRegistro(op,login,email,password);
            if(!_resp) throw new Error('error en acceso MONGODB ante login/registro');
            
            let _tokens: Array<string> = JWTService.GenerarJWT(
                { email, idCliente: _resp._id, nombre: _resp.nombre, apellidos: _resp.apellidos  },
                '1h',
                true
            );

            res.status(200).send( {
                                    codigo:0, 
                                    mensaje: op=='Login' ? 'Login usuario ok...' : 'Registro usuario OKS!!!', 
                                    datos: { 
                                             datosCliente:_resp,
                                             tokens: { accessToken: op=='Login' ? _tokens[0] : '', refreshToken: op=='Login' ? _tokens[1] : '' } 
                                            }
                                } );

        } catch (error) {
            console.log('error durante login o registro cliente...', error);
            res.status(200).send( {codigo:1, mensaje:'error durante login o registro cliente...' + error} );
        }
    }
}

export default ClienteController;