import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts = [
    { title: 'Película 1', description: 'Descripción de la película 1', image: 'https://via.placeholder.com/150' },
    { title: 'Película 2', description: 'Descripción de la película 2', image: 'https://via.placeholder.com/150' }
  ];
  constructor() {}
  
  //definir la funcion de agregar publicaciones
  addPost() {
    console.log('Agregar nueva publicación');
  }
}
