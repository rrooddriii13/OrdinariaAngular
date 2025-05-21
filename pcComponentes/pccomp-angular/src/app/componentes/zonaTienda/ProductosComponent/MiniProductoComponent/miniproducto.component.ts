import { Component, inject, input } from '@angular/core';
import { IProducto } from '../../../../modelos/interfaces_orm/IProducto';
import { Router } from '@angular/router';
import { CalculadescuentoPipe } from '../../../../pipes/calculadescuento.pipe';

@Component({
  selector: 'app-miniproducto',
  imports: [CalculadescuentoPipe],
  templateUrl: './miniproducto.component.html',
  styleUrl: './miniproducto.component.css'
})
export class MiniproductoComponent {
  producto=input<IProducto>();

  private router:Router=inject(Router)

  MostrarDetallesProducto(){
    this.router.navigate(['/Tienda/MostrarProducto', this.producto()!.codArticulo]);
  }
}
