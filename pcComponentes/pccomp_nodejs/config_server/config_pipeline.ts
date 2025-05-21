//modulo typescript q exporta una unica funcion q recibe como parametro el servidor web express
//a configurar su pipeline (funciones middleware)

import express,{Express} from 'express';
import cors from 'cors';
import routingCliente from './config_routing/endpointsZonaCliente';
import routingTienda from './config_routing/endpointsZonaTienda';
import routingGEOAPI from './config_routing/endpointsGEOAPI';

export default function config_pipeline(serverWeb:Express){
    serverWeb.use(express.json({ limit: '50mb'})); //<--- si no pones un limite grande, y se adjuntan en el http-body payloads muy pesados te salta excepcion: PayloadTooLargeError: request entity too large...pq por defecto tiene limite de menos de 1mg, asi lo amplias!!! https://betterstack.com/community/questions/fix-request-entity-too-large/
    serverWeb.use(express.urlencoded({limit:'50mb',extended: true}));
    serverWeb.use(cors());

    //midleware de enrutamiento...servicio REST-GATEWAY
    serverWeb.use('/api/zonaCliente', routingCliente);
    serverWeb.use('/api/zonaTienda', routingTienda);
    serverWeb.use('/api/GEOAPI', routingGEOAPI);
}