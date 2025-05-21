import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { ActivatedRoute, Router, RouterModule, UrlSegment } from '@angular/router';
import { RestNodeService } from '../../../servicios/rest-node.service';
import { StorageService } from '../../../servicios/storage.service';
import IRespuestaREST from '../../../modelos/IRespuestaREST';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-loginregistro',
  imports: [ ReactiveFormsModule, RouterModule, AsyncPipe, JsonPipe ],
  templateUrl: './loginregistro.component.html',
  styleUrl: './loginregistro.component.css'
})
export class LoginregistroComponent {
  public formVista:FormGroup;
  public enLogin=signal<boolean>(false); 

  private actRoute:ActivatedRoute=inject(ActivatedRoute)
  private router:Router=inject(Router)
  private restSvc: RestNodeService=inject(RestNodeService)
  private storageSvc: StorageService=inject(StorageService)

  constructor( ){

      //detectar la url cargada en el navegador, para mostrar/ocultar cajas de texto y checkbox en funcion si estamos en el LOGIN o en el REGISTRO
     // url sea /Cliente/Login -----> enLogin = true
     // url sea /Cliente/Registro --> enLoging = false
     let _urlSegments:UrlSegment[]=this.actRoute.snapshot.url;
     let _url:string=_urlSegments.join('/');

     //console.log(_url, _url=='Cliente/Login');

     this.enLogin.set(_url=='Login' ? true : false);

     this.formVista=new FormGroup(
            {
              login: new FormControl('',[ Validators.required, Validators.maxLength(25), Validators.minLength(3) ] ), //<--- validador asincrono para comprobar si existe ya o no ese login...
              email: new FormControl('', [ Validators.required, Validators.email ]), //<------------------------------------ validador asincrono para comprobar si ese email esta ya registrado en mongodb o no...
              password: new FormControl( '', [ Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$')]),
              repassword: new FormControl('', [ Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$')]) //<---- crear validacion sincrona para comprobar si coincide o no con el campo password
            }
     );
  }

  async LoginRegistro(){
    //------- la prop. status del formGroup es INVALID si estamos en /Cliente/Login pq los formControl "login" y "repassword" estan ocultos, tengo q diferenciar en q caso estoy  
    console.log(this.formVista);

    if(this.enLogin()){

        if(this.formVista.controls['email'].status=='VALID' && this.formVista.controls['password'].status=='VALID'){
          //paso credenciales a servicio angular para q los mande al servicio REST de NODEJS....
          let _respLogin:IRespuestaREST=await this.restSvc.LoginRegistro(
                                              'Login',
                                              '',
                                              this.formVista.controls['email'].value,
                                              this.formVista.controls['password'].value
                                               ) as IRespuestaREST;
          if( _respLogin.codigo==0){
             this.storageSvc.SetDatosCliente(_respLogin.datos.datosCliente);
             this.storageSvc.SetJWT(_respLogin.datos.tokens);

             this.router.navigateByUrl('/');
          } else{
            //mostraria mensajes de error del server....
          }
        }

    } else {
      console.log('vamos a registrarnos...', this.formVista);

      if(this.formVista.status=='VALID'){
        //paso campos del form. al servicio de angular para hacer el REGISTRO en servicio REST de NODEJS contra mongodb....
        let _respResgistro:IRespuestaREST=await this.restSvc.LoginRegistro(
                                                            'Registro',
                                                            this.formVista.controls['login'].value,
                                                            this.formVista.controls['email'].value,
                                                            this.formVista.controls['password'].value 
                                                          ) as IRespuestaREST;
        if( _respResgistro.codigo==0){
           this.router.navigateByUrl('/Tienda/Cliente/RegistroOk');
        } else{
          //mostraria mensajes de error del server....
        }

      } else {
        //mostrar mensajes de error en campos...

      }
    }
      
  }

  async LoginGoogle(){

  }

  IrALoginRegistro(){
    console.log('en metodo...');
      if(this.enLogin()) {
          this.router.navigateByUrl('/Cliente/Registro');
      } else {
          this.router.navigate(['/Cliente/Login'])
      }
  }
}
