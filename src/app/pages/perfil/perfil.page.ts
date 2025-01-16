import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  imagenPerfil: string | null = null;

  posts = [
    {
      title: "Post 1",
      content: "Pudo haber sido mejor."
    },
    {
      title: "Post 2",
      content: "No me gustó."
    },
    {
      title: "Post 3",
      content: "Me encantó."
    }
  ];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarFotoPerfil();
  }

  ionViewWillEnter() {
    this.cargarFotoPerfil(); 
    this.cd.detectChanges();
  }

  cargarFotoPerfil() {
    this.imagenPerfil = localStorage.getItem('fotoPerfil'); 
  }

  logout() {
    
  }
}

