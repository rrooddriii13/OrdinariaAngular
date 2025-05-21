import { NgStyle } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Stage1PedidoComponent } from "../Stage-1-PedidoComponent/stage1-pedido.component";
import { Stage2PedidoComponent } from "../Stage-2-PedidoComponent/stage2-pedido.component";

@Component({
  selector: 'app-mostrar-pedido-layout',
  imports: [RouterModule, Stage1PedidoComponent, Stage2PedidoComponent],
  templateUrl: './mostrar-pedido-layout.component.html',
  styleUrl: './mostrar-pedido-layout.component.css'
})
export class MostrarPedidoLayoutComponent {

  private router:Router=inject(Router);
  private activatedRoute:ActivatedRoute=inject(ActivatedRoute);

  public textoBoton:string='Realizar pedido';
  public stages:Array<{ Key:number, Value:string}>=[
    { Key: 1, Value: "Cesta" },
    { Key: 2, Value: "Direccion de envio" },
    { Key: 3, Value: "Opciones de entrega" },
    { Key: 4, Value: "Metodo de pago" },
    { Key: 5, Value: "Resumen" }
  ];
  public stage=signal<number>(parseInt(this.activatedRoute.snapshot.paramMap.get('stage') || '1'));

  constructor(){
    effect( ()=>console.log('estamos en fase del pedido...', this.stage()) );
  }

   SaltarDeStage(stage:number, target:string){
      console.log('pulsado...',target, stage);

     if(target=='boton') { this.stage.set( this.stage()+1 ) } else { this.stage.set(stage) }
      if(this.stage() <= 5 )
      {
        switch (this.stage())
        {
            case 1:
                this.textoBoton = "Realizar pedido";
                break;
            case 5:
                this.textoBoton = "Pagar ahora y finalizar";
                break;
            default:
                this.textoBoton = "Guardar y continuar";
                break;

        }
        //this.router.navigate(['/Pedido/Stage', this.stage()]);  

      } else {
        //finalizar pedido...
      }
    }
}
