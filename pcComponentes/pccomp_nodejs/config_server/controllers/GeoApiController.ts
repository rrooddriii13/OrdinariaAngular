import { NextFunction, Request, Response } from "express";
import { IProvincia } from "../../modelos/interfaces_orm/IProvincia";
import MongoDBService from '../../servicios/mongoDBService';
import { IMunicipio } from "../../modelos/interfaces_orm/IMunicipio";

const GeoApiController:any={
    GetProvincias:  async function(req:Request, res:Response, next:NextFunction){
        try {
            let _provs:IProvincia[]=await MongoDBService.GetProvincias();

            res.status(200).send({codigo:0, mensaje:' provincias oksss', datos: _provs});

        } catch (error) {
            console.log('error a la hora de obtener provincias...', error);
            res.status(200).send({codigo:1, mensaje:'error a la hora de obtener provincias...'});
        }
    },

    GetMunicipios:  async function(req:Request, res:Response, next:NextFunction){
        try {
            //hay q pasarle por GET el parametro codProv o codigo provincia (en bbdd es CPRO)
            let _munis:IMunicipio[]=await MongoDBService.GetMunicipios(req.query.codProv);
            res.status(200).send({codigo:0, mensaje:' municipios oksss', datos: _munis});
            
        } catch (error) {
            console.log('error a la hora de obtener provincias...', error);
            res.status(200).send({codigo:1, mensaje:'error a la hora de obtener municipios...'});            
        }
    },

}

export default GeoApiController;