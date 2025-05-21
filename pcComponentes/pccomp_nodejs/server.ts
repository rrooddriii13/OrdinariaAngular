import 'dotenv/config'; //<---- lee el fichero .env y crea variables de entorno accesibles con process.env.
import express,{ Request, Response , Express} from 'express';
import config_pipeline from './config_server/config_pipeline';

const app:Express=express();

config_pipeline(app);

app.listen(3003, ()=> console.log('--- servidor WEB EXPRESS corriendo en puerto 3003 ---'));
