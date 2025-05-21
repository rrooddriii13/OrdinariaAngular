import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducto } from '../../../modelos/interfaces_orm/IProducto';
import { CalculadescuentoPipe } from '../../../pipes/calculadescuento.pipe';

@Component({
  selector: 'app-mostrar-producto',
  imports: [CalculadescuentoPipe],
  templateUrl: './mostrar-producto.component.html',
  styleUrl: './mostrar-producto.component.css'
})
export class MostrarProductoComponent {
  
  private activatedRoute:ActivatedRoute=inject(ActivatedRoute)
  
  producto=signal<IProducto>(this.activatedRoute.snapshot.data['producto']);


}
