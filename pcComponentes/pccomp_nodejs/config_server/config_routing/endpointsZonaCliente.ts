//modulo de codigo de nodejs q exporta un objeto ROUTER de express para definir endpoints y funciones middleware q 
//se ejecutan cuando se alcanzan dichos endpoints o rutas de zonaCliente
//para crear este objeto Router se usa el metodo .Router() de express
import express, { Router } from 'express';
import ClienteController from '../controllers/zonaClienteController';



const routingCliente:Router=express.Router();

routingCliente.post('/LoginRegistro', ClienteController.LoginRegistro );


export default routingCliente;