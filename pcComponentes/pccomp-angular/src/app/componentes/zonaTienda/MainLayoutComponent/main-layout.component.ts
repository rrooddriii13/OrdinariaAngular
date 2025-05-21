import { Component, inject, signal } from '@angular/core';
import { ICategoria } from '../../../modelos/interfaces_orm/ICategoria';
import { IProducto } from '../../../modelos/interfaces_orm/IProducto';
import ICliente from '../../../modelos/interfaces_orm/ICliente';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestNodeService } from '../../../servicios/rest-node.service';
import { StorageService } from '../../../servicios/storage.service';
import { MiniItemPedidoOffCanvasComponent } from './MiniItemPedidoOffCanvasComponent/mini-item-pedido-off-canvas.component';

@Component({
  selector: 'app-main-layout',
  imports: [ MiniItemPedidoOffCanvasComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  
  private router:Router=inject(Router);
  private activatedRoute: ActivatedRoute=inject(ActivatedRoute);
  private storageSvc:StorageService=inject(StorageService)
  private restSvc:RestNodeService=inject(RestNodeService);

  public cliente=signal<ICliente|null>( this.storageSvc.GetDatosCliente() );
  public categoriasRaices=signal<ICategoria[]>( this.activatedRoute.snapshot.data['categorias']);
  public subcategorias=signal<ICategoria[]>([]);

  async RecuperaCategorias(path:string){
      let _subcats:ICategoria[]=await this.restSvc.RecuperarCategorias(path);
      this.subcategorias.set(_subcats);
  }

  CargarProductos(pathCat: string) {
    console.log('saltando a productos de ...', pathCat);
    this.router.navigate(['/Tienda/Productos',pathCat])
    }
}
