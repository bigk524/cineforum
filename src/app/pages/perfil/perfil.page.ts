import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { Usuario } from 'src/app/services/usuario';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    clave: '',
    descripcion: '',
    rol: 0,
    foto: null
  };
  imagenPerfil: string | null = null;
  userComments: any[] = [];

  constructor(
    private dbService: DbService,
    private nativeStorage: NativeStorage,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const userData = await this.nativeStorage.getItem('usuario');
      const userFromDb = await this.dbService.getUserById(userData.id);
      this.usuario = userFromDb;
      this.imagenPerfil = this.usuario.foto as string;
      this.userComments = await this.dbService.getUserComments(this.usuario.id);
    } catch (error) {
      console.error('Error loading user data:', error);
      this.router.navigate(['/login']);
    }
  }

  editProfile() {
    this.router.navigate(['/opciones-perfil']);
  }

  logout() {
    this.nativeStorage.clear();
    this.router.navigate(['/login']);
  }
}