import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedUserSubject = new BehaviorSubject<Usuario | null>(null);
  loggedUser() {
    return this.loggedUserSubject.asObservable();
  }

  constructor(
    private nativeStorage: NativeStorage,
    private alertController: AlertController,
    private dbService: DbService,
    private router: Router
  ) { }

  async getUser(): Promise<Usuario> {
    try {
      const usuario = await this.nativeStorage.getItem('usuario');
      return usuario;
    } catch (e) {
      console.error('Error al obtener el ususario: ', JSON.stringify(e));
      throw new Error('Error al obtener el usuario: ' + JSON.stringify(e));
    }
  }

  async loadUsuario() {
    const usuario = await this.getUser();
    this.loggedUserSubject.next(usuario);
  }

  async login(usuario: Usuario) {
    const usuarioLogeado = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      descripcion: usuario.descripcion,
      foto: usuario.foto,
      rol: usuario.rol,
      // no sería mejor sacar la contraseña del modelo?
      clave: '***' // no vamos a guardar la contraseña en native storage
    };
    await this.nativeStorage.setItem('usuario', usuarioLogeado);
    this.loggedUserSubject.next(usuarioLogeado)
  }
  

  

}
