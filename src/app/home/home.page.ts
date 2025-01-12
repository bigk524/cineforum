import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user: string = '';
  movies = [
    {
      title: 'Blade Runner 2049',
      description: 'La secuela de Blade Runner de 1982',
      poster: '/assets/bladerunner.jpg',
      route: '/blanerunner',
    },
    {
      title: 'Deadpool 3',
      description: 'La tercera entrega de Deadpool',
      poster: '/assets/deadpool.jpg',
    },
    {
      title: 'Profesión Peligro',
      description: 'Ryan Gosling y Harrison Ford en una película de acción',
      poster: '/assets/The-fall-guy.jpg',
    },
    {
      title: 'Ready Player One',
      description: 'Una película de ciencia ficción de Steven Spielberg',
      poster: '/assets/unnamed.png',
    },
    {
      title: 'The Matrix',
      description: 'La película de los hermanos Wachowski',
      poster: '/assets/the-matrix.jpg',
    }
  ]
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private menuCtrl: MenuController
  ) {
    this.ionViewWillOpen();
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    })
  }

  ionViewWillOpen() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(true);
  }

  routeToMovie(route: any) {
    let navigationExtras = {
      state: {
        user: this.user
      }
    }
    this.router.navigate([route], navigationExtras);
  }
  
  //definir la funcion de agregar publicaciones
  addPost() {
    console.log('Agregar nueva publicación');
  }
}
