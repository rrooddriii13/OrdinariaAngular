import { Component, inject } from '@angular/core';
import { ItemPedidoComponent } from './ItemPedidoComponent/item-pedido.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stage1-pedido',
  imports: [ItemPedidoComponent],
  templateUrl: './stage1-pedido.component.html',
  styleUrl: './stage1-pedido.component.css'
})
export class Stage1PedidoComponent {

  private router:Router=inject(Router);

  GotoProducts() {
    this.router.navigateByUrl('/');
  }

}
