import { Component } from '@angular/core';
import { MiniDireccionComponent } from "./MiniDireccionComponent/mini-direccion.component";
import { ModalDirEnvioComponent } from "./ModalDirnEnvioComponent/modal-dir-envio.component";

@Component({
  selector: 'app-stage2-pedido',
  imports: [MiniDireccionComponent, ModalDirEnvioComponent],
  templateUrl: './stage2-pedido.component.html',
  styleUrl: './stage2-pedido.component.css'
})
export class Stage2PedidoComponent {

}
