//modulo de codigo de nodejs q exporta un objeto ROUTER de express para definir endpoints y funciones middleware q 
//se ejecutan cuando se alcanzan dichos endpoints o rutas de GEOAPI
//para crear este objeto Router se usa el metodo .Router() de express
import express, { Router } from 'express';
import GeoApiController from '../controllers/GeoApiController';



const routingGEOAPI:Router=express.Router();

routingGEOAPI.get('/GetProvincias', GeoApiController.GetProvincias );
routingGEOAPI.get('/GetMunicipios', GeoApiController.GetMunicipios );


export default routingGEOAPI;