import { MaybeAsync, ResolveFn } from '@angular/router';
import { IProducto } from '../modelos/interfaces_orm/IProducto';
import { RestNodeService } from '../servicios/rest-node.service';
import { inject } from '@angular/core';

export const productosResolver: ResolveFn<IProducto[]> = (route, state):Promise<IProducto[]> => {
  
  const _restSvc:RestNodeService=inject(RestNodeService);
  const _pathCat:string=route.paramMap.get('pathCat') as string;
    
  return _restSvc.RecuperarProductos(_pathCat);
};
