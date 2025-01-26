import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
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
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'blanerunner',
    loadChildren: () => import('./pages/blanerunner/blanerunner.module').then( m => m.BlanerunnerPageModule)
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./pages/admin-panel/admin-panel.module').then( m => m.AdminPanelPageModule)
  },
  {
    path: 'recuperarcontra',
    loadChildren: () => import('./pages/recuperarcontra/recuperarcontra.module').then( m => m.RecuperarcontraPageModule)
  },
  {
    path: 'tendencias',
    loadChildren: () => import('./pages/tendencias/tendencias.module').then( m => m.TendenciasPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'posts-baneados',
    loadChildren: () => import('./pages/posts-baneados/posts-baneados.module').then( m => m.PostsBaneadosPageModule)
  },
  {
    path: 'crear-publicacion',
    loadChildren: () => import('./pages/crear-publicacion/crear-publicacion.module').then( m => m.CrearPublicacionPageModule)
  },
  {
    path: 'oppenheimer',
    loadChildren: () => import('./pages/oppenheimer/oppenheimer.module').then( m => m.OppenheimerPageModule)
  },
  {
    path: 'spider-man',
    loadChildren: () => import('./pages/spider-man/spider-man.module').then( m => m.SpiderManPageModule)
  },
  {
    path: 'barbie',
    loadChildren: () => import('./pages/barbie/barbie.module').then( m => m.BarbiePageModule)
  },
  {
    path: 'opciones',
    loadChildren: () => import('./pages/opciones/opciones.module').then( m => m.OpcionesPageModule)
  },
  {
    path: 'opciones/perfil',
    loadChildren: () => import('./pages/opciones-perfil/opciones-perfil.module').then( m => m.OpcionesPerfilPageModule)
  },
  {
    path: 'opciones/seguridad',
    loadChildren: () => import('./pages/opciones-seguridad/opciones-seguridad.module').then( m => m.OpcionesSeguridadPageModule)
  },
  {
    path: 'pelicula/:id',
    loadChildren: () => import('./pages/pelicula/pelicula.module').then( m => m.PeliculaPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
  

  
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
