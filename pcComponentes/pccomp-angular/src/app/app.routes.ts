import { Routes } from '@angular/router';
import { LoginregistroComponent } from './componentes/zonaCliente/LoginRegistroComponent/loginregistro.component';
import { MainLayoutComponent } from './componentes/zonaTienda/MainLayoutComponent/main-layout.component';
import { ProductosComponent } from './componentes/zonaTienda/ProductosComponent/productos.component';
import { MostrarProductoComponent } from './componentes/zonaTienda/MostrarProductoComponent/mostrar-producto.component';
import { productosResolver } from './resolvers/productos.resolver';
import { recuperarProductoResolver } from './resolvers/recuperar-producto.resolver';
import { categoriasResolver } from './resolvers/categorias.resolver';
import { MostrarPedidoLayoutComponent } from './componentes/zonaTienda/PedidoComponent/LayOutMostrarPedidoComponent/mostrar-pedido-layout.component';

export const routes: Routes = [
    { path:'', redirectTo:'/Tienda/Productos/4-1', pathMatch:'full' },
    { path:'Tienda', 
      component: MainLayoutComponent,
      resolve:{ categorias: categoriasResolver },
      children:[
        { path: 'Productos/:pathCat', component: ProductosComponent, resolve: { productos: productosResolver } },
        { path: 'MostrarProducto/:codprod', component: MostrarProductoComponent, resolve: { producto: recuperarProductoResolver  } },
      ]
    },    
    { path: 'Cliente',
      children:[
        { path: 'Login', component: LoginregistroComponent },
        { path: 'Registro', component: LoginregistroComponent },
      ]
    },
    { path: 'Pedido', component: MostrarPedidoLayoutComponent },
];
