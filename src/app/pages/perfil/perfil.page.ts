import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  posts = [
    {
      title: "Post 1",
      content: "Pudo haber sido mejor."
    },
    {
      title: "Post 2",
      content: "No me gusto."
    },
    {
      title: "Post 3",
      content: "Me encanto."
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  logout() {

  }

}
