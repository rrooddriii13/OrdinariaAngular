import { ResolveFn } from '@angular/router';
import { IProducto } from '../modelos/interfaces_orm/IProducto';
import { RestNodeService } from '../servicios/rest-node.service';
import { inject } from '@angular/core';

export const recuperarProductoResolver: ResolveFn<IProducto> = (route, state):Promise<IProducto> => {
  const _restSvc:RestNodeService=inject(RestNodeService);
  const _codProd:string=route.paramMap.get('codprod') as string;
    
  return _restSvc.RecuperarProducto(_codProd);
};
