//modulo de codigo de nodejs q exporta un objeto ROUTER de express para definir endpoints y funciones middleware q 
//se ejecutan cuando se alcanzan dichos endpoints o rutas de zonaTienda
//para crear este objeto Router se usa el metodo .Router() de express
import express, { Router } from 'express';
import TiendaController from '../controllers/zonaTiendaController';



const routingTienda:Router=express.Router();

routingTienda.get('/RecuperarCategorias',TiendaController.RecuperarCategorias );
routingTienda.get('/RecuperarProductos',TiendaController.RecuperarProductos );
routingTienda.get('/RecuperarProducto',TiendaController.RecuperarProducto );


export default routingTienda;