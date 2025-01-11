import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  movies = [
    {
      title: 'Blade Runner 2049',
      description: 'La secuela de Blade Runner de 1982',
      poster: '/assets/bladerunner.jpg',
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
  constructor() {}
  
  //definir la funcion de agregar publicaciones
  addPost() {
    console.log('Agregar nueva publicación');
  }
}
