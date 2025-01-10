import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./pages/peliculas/peliculas.module').then( m => m.PeliculasPageModule)
  },
  {
    path: 'infopeli',
    loadChildren: () => import('./pages/infopeli/infopeli.module').then( m => m.InfopeliPageModule)
  },
  {
    path: 'foropeli',
    loadChildren: () => import('./pages/foropeli/foropeli.module').then( m => m.ForopeliPageModule)
  },
  {
    path: 'perfilusuario',
    loadChildren: () => import('./pages/perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)
  },
  {
    path: 'paggeneros',
    loadChildren: () => import('./pages/paggeneros/paggeneros.module').then( m => m.PaggenerosPageModule)
  },
  {
    path: 'pelistendencias',
    loadChildren: () => import('./pages/pelistendencias/pelistendencias.module').then( m => m.PelistendenciasPageModule)
  },
  {
    path: 'crearpublicacion',
    loadChildren: () => import('./pages/crearpublicacion/crearpublicacion.module').then( m => m.CrearpublicacionPageModule)
  },
  {
    path: 'modificarpublicacion',
    loadChildren: () => import('./pages/modificarpublicacion/modificarpublicacion.module').then( m => m.ModificarpublicacionPageModule)
  },
  {
    path: 'recuperarcontra',
    loadChildren: () => import('./pages/recuperarcontra/recuperarcontra.module').then( m => m.RecuperarcontraPageModule)
  },
  {
    path: 'cambiarcontra',
    loadChildren: () => import('./pages/cambiarcontra/cambiarcontra.module').then( m => m.CambiarcontraPageModule)
  },
  {
    path: 'banusuarios',
    loadChildren: () => import('./pages/banusuarios/banusuarios.module').then( m => m.BanusuariosPageModule)
  },
  {
    path: 'editarperfilusuario',
    loadChildren: () => import('./pages/editarperfilusuario/editarperfilusuario.module').then( m => m.EditarperfilusuarioPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'deletepublicaciones',
    loadChildren: () => import('./pages/deletepublicaciones/deletepublicaciones.module').then( m => m.DeletepublicacionesPageModule)
  },
  {
    path: 'verelmotivodeban',
    loadChildren: () => import('./pages/verelmotivodeban/verelmotivodeban.module').then( m => m.VerelmotivodebanPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
