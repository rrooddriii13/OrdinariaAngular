import { Injectable, signal } from '@angular/core';
import ICliente from '../modelos/interfaces_orm/ICliente';

type Tokens = {
  accessToken: string,
  refreshToken: string
}


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _datosCliente=signal<ICliente|null>(null);
  private _tokens=signal<Tokens | null>(null);

  constructor() { }

  IsClienteLogged():boolean{
    return this._datosCliente() ? true : false
  }

  SetDatosCliente(datosCliente:ICliente){
    this._datosCliente.set(datosCliente);
  }

  GetDatosCliente():ICliente | null{
    return this._datosCliente();
  }

  SetJWT( tokens:Tokens){
    this._tokens.set(tokens);
  }

  GetJWT():Tokens | null {
    return this._tokens();
  }


}
