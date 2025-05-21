import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducto } from '../../../modelos/interfaces_orm/IProducto';
import { MiniproductoComponent } from './MiniProductoComponent/miniproducto.component';

@Component({
  selector: 'app-productos',
  imports: [MiniproductoComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  private _activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  
  productos=signal<IProducto[]>( [] )

  constructor(){
    console.log('data snap activatedroute...', this._activatedRoute.snapshot.data);
    effect(
      ()=>console.log('prodcutos recuperados en comonente PRODUCTOS.COMPONENT del resolver...' + this.productos())
    )

    this.productos.set(this._activatedRoute.snapshot.data['productos']);

  }

}
