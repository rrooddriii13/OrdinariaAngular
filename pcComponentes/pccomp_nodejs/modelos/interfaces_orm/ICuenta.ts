export default interface ICuenta {
    login: string,
    email: string,
    password: string,
    imagenAvatar?:string,
    cuentaActiva:boolean
}