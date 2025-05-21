import { IMunicipio } from "./IMunicipio";
import { IProvincia } from "./IProvincia";

export interface IDireccion {
    _id?: string;
    calle: string;
    datosopcionales?:string;
    cp: number;
    pais:string;
    provincia: IProvincia;
    municipio: IMunicipio;
    personaContacto: { nombre:string, apellidos?:string, nifcif?:string, telefono: string, tipoContato: string }
    esPrincipal: boolean;
    esFacturacion: boolean;
    predeterminada:boolean;
}