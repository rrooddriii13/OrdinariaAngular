import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MaybeAsync } from '@angular/router';
import { lastValueFrom, map, tap } from 'rxjs';
import IRespuestaREST from '../modelos/IRespuestaREST';
import { ICategoria } from '../modelos/interfaces_orm/ICategoria';
import { IProducto } from '../modelos/interfaces_orm/IProducto';

@Injectable({
  providedIn: 'root'
})
export class RestNodeService {
  
  private _httpClient:HttpClient=inject(HttpClient)

  constructor() { }

  //#region ----------- zona cliente ---------------
  public LoginRegistro(op:string, login:string, email:string, password: string, ):Promise<IRespuestaREST>{
    return lastValueFrom(
      this._httpClient
          .post<IRespuestaREST>(
                            'http://localhost:3003/api/zonaCliente/LoginRegistro', 
                            { op, login, email, password },
                            { headers: new HttpHeaders( {'Content-Type':'application/json'} ) }
            )
    )
  }
  //#endregion

  //#region ----------- zona tienda ---------------
  public RecuperarCategorias(pathCat:string):Promise<ICategoria[]>{
        return lastValueFrom(
          this._httpClient
              .get<IRespuestaREST>(`http://localhost:3003/api/zonaTienda/RecuperarCategorias?pathCat=${pathCat}`)
              .pipe(
                  //tap((resp:IRespuestaREST)=> console.log('respuesta nodejs de categorias recuperadas...', resp)),
                  map( (resp:IRespuestaREST)=> resp.codigo==0 ? resp.datos : [] )
              )
        )
      
  }

  public RecuperarProductos(pathCat:string):Promise<IProducto[]>{
    return lastValueFrom(
      this._httpClient
          .get<IRespuestaREST>(`http://localhost:3003/api/zonaTienda/RecuperarProductos?pathCat=${pathCat}`)
          .pipe(
              //tap((resp:IRespuestaREST)=> console.log('respuesta nodejs de productos recuperadas...', resp)),
              map( (resp:IRespuestaREST)=> resp.codigo==0 ? resp.datos : [] )
          )
    )
  }
  
  public RecuperarProducto(codProd:string):Promise<IProducto>{
    return lastValueFrom(
      this._httpClient
          .get<IRespuestaREST>(`http://localhost:3003/api/zonaTienda/RecuperarProducto?codProd=${codProd}`)
          .pipe(
              //tap((resp:IRespuestaREST)=> console.log('respuesta nodejs de productos recuperadas...', resp)),
              map( (resp:IRespuestaREST)=> resp.codigo==0 ? resp.datos : null )
          )
    )
  }   

  //#endregion

}
