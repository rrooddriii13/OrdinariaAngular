import ICuenta from "./ICuenta";

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
    direcciones: Array<any>,
    pedidos: Array<any>
}