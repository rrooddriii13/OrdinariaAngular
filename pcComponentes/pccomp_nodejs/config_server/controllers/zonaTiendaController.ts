import { Request, Response, NextFunction } from "express";
import MongoDBService from '../../servicios/mongoDBService';

const TiendaController:any={
     RecuperarCategorias: async function(req:Request, res:Response, next:NextFunction){

            let _listaCats=await MongoDBService.RecuperarCategorias(req.query.pathCat);
            console.log('lista categorias...', _listaCats);

            res.status(200).send( { codigo:0, mensaje:`categorias ${req.query.pathCat} recuperadas ok...`, datos: _listaCats } );
     },
     RecuperarProductos: async function(req:Request, res:Response, next:NextFunction){
        let _listaProds=await MongoDBService.RecuperarProductos(req.query.pathCat);
        //console.log('lista productos...', _listaProds);

        res.status(200).send({ codigo:0, mensaje:`productos de cat: ${req.query.pathCat} recuperadas ok...`, datos: _listaProds });
     },
     RecuperarProducto: async function(req:Request, res:Response, next:NextFunction){
        let _prod=await MongoDBService.RecuperarProducto(req.query.codProd);
        console.log('producto con codigo ', req.query.codProd, _prod);

        res.status(200).send({ codigo:0, mensaje:`producto con codArticulo: ${req.query.codProd} recuperado ok...`, datos: _prod });
     },
     
}

export default TiendaController;