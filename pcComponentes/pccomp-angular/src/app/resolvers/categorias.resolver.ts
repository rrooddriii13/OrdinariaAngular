import { MaybeAsync, ResolveFn } from '@angular/router';
import { ICategoria } from '../modelos/interfaces_orm/ICategoria';
import { RestNodeService } from '../servicios/rest-node.service';
import { inject } from '@angular/core';

export const categoriasResolver: ResolveFn<ICategoria[]> = async (route, state):Promise<ICategoria[]> => {
  const _restSvc=inject(RestNodeService);
  
  return _restSvc.RecuperarCategorias('raices');
  
};
