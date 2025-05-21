import ICuenta from "./ICuenta";
import { IDireccion } from "./IDireccion";

export default interface ICliente {
    _id?:string,
    nombre: string,
    apellidos: string,
    fechaNacimiento?: number,
    genero?:string,
    telefono?: string,
    rankig?: string,
    puntos?:number,
    nif?: string,
    cuenta: ICuenta,
    direcciones: Array<IDireccion>,
    pedidos: Array<any>
}