import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, firstValueFrom, from, Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  public database!: SQLiteObject;

  tablaRoles = 
    `CREATE TABLE IF NOT EXISTS roles (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(10) NOT NULL
    );
  `;

  tablaUsuario = 
    `CREATE TABLE IF NOT EXISTS usuario (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre    VARCHAR(20) NOT NULL,
      email     VARCHAR(50) NOT NULL,
      clave     VARCHAR(16) NOT NULL,
      descripcion TEXT,
      banneado  BOOLEAN,
      rol       VARCHAR(10),
      foto      BLOB,
      foreign key (rol) references roles (id)
    );
  `;

  tablaPeliculas = 
    `CREATE TABLE IF NOT EXISTS peliculas (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo      VARCHAR(50) NOT NULL,
      genero      VARCHAR(20),
      duracion    INTEGER,
      clasificacion VARCHAR(5),
      sinopsis    TEXT,
      director    VARCHAR(50),
      rating      DECIMAL(2,1),
      estreno     DATE,
      portada     BLOB
    );
  `;

  tablaComentariosPeliculas = 
    `CREATE TABLE IF NOT EXISTS comentarios_peliculas (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pelicula INTEGER,
      id_usuario  INTEGER,
      comentario  TEXT,
      fecha       DATE,
      FOREIGN KEY (id_pelicula) REFERENCES peliculas (id),
      FOREIGN KEY (id_usuario) REFERENCES usuario (id)
    );
  `;

  tablaTendencias = 
    `CREATE TABLE IF NOT EXISTS tendencias (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pelicula INTEGER,
      fecha       DATE,
      FOREIGN KEY (id_pelicula) REFERENCES peliculas (id)
    );
  `;

  tablaBanneo = 
    `CREATE TABLE IF NOT EXISTS banneo (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario  INTEGER,
      fecha       DATE,
      razon       TEXT,
      FOREIGN KEY (id_usuario) REFERENCES usuario (id)
    );
  `;

  registroRoles = `
    INSERT OR IGNORE INTO roles (nombre) VALUES ('admin'), ('usuario');
  `;

  registroUsuario = `
    INSERT OR IGNORE INTO usuario (nombre, email, clave, descripcion, banneado, rol) VALUES 
    ('admin', 'admin@cineforum.cl', 'admin', 'Administrador del sistema', 0, 1),
    ('pepe_torres', 'p.torres@email.com', '123456', 'Usuario registrado', 0, 2),
    ('juan_perez', 'j.perez@email.com', '123456', 'Usuario registrado', 0, 2),
    ('maria_gonzalez', 'm.gonzales@email.com', '123456', 'Usuario registrado', 0, 2),
    ('matias_ramirez', 'm.ramirez@email.com', '123456', 'Usuario registrado', 0, 2),
    ('jaime_rodriguez', 'j.rodriguez@email.com', '123456', 'Usuario registrado', 0, 2);
  `;

  registroPeliculas = `
    INSERT OR IGNORE INTO peliculas 
    (titulo, genero, duracion, clasificacion, sinopsis, director, rating, estreno) VALUES
    ('El Padrino', 'Drama', 175, '18+', 'La historia de la familia Corleone', 'Francis Ford Coppola', 9.2, '1972-03-24'),
    ('El Padrino II', 'Drama', 202, '18+', 'La historia de la familia Corleone', 'Francis Ford Coppola', 9.0, '1974-12-20'),
    ('Volver al Futuro', 'Ciencia Ficción', 116, '7+', 'Un joven viaja al pasado en un auto', 'Robert Zemeckis', 8.5, '1985-07-03'),
    ('Titanic', 'Drama', 195, '12+', 'Un barco se hunde en el Atlántico', 'James Cameron', 7.8, '1998-01-23'),
    ('El Señor de los Anillos: La Comunidad del Anillo', 'Fantasía', 178, '12+', 'Un anillo mágico debe ser destruído', 'Peter Jackson', 8.8, '2001-12-19'),
    ('Rápido y Furioso', 'Acción', 106, '14+', 'Un policía se infiltra en carreras ilegales', 'Rob Cohen', 6.8, '2001-06-22');
  `;

  /* TAREA: < Copiar los comentarios viejos > */
  registroComentariosPeliculas = `
    INSERT OR IGNORE INTO comentarios_peliculas 
    (id_pelicula, id_usuario, comentario, fecha) VALUES 
    (1, 2, 'Excelente película', '2021-06-01'),
    (1, 3, 'Una obra maestra', '2021-06-02'),
    (1, 4, 'Muy buena', '2021-06-03'),
    (2, 2, 'Muy buena continuación', '2021-06-04'),
    (2, 3, 'Excelente', '2021-06-05'),
    (2, 4, 'Muy buena', '2021-06-06'),
    (3, 2, 'Muy buena', '2021-06-07'),
    (3, 3, 'Excelente', '2021-06-08'),
    (3, 4, 'Muy buena', '2021-06-09'),
    (4, 2, 'Excelente', '2021-06-10'),
    (4, 4, 'Excelente', '2021-06-12'),
    (5, 2, 'Excelente', '2021-06-13'),
    (5, 3, 'Muy buena', '2021-06-14'),
    (5, 4, 'Excelente', '2021-06-15');
  `;

  registroTendencias = `
    INSERT OR IGNORE INTO tendencias (id_pelicula, fecha) VALUES 
    (1, '2021-06-01'), 
    (2, '2021-06-02'), 
    (3, '2021-06-03'), 
    (4, '2021-06-04'), 
    (5, '2021-06-05');
  `;

  registroBanneo = `
    INSERT OR IGNORE INTO banneo 
    (id_usuario, fecha, razon) VALUES 
    (5, '2021-06-01', 'Comentarios ofensivos');
  `;

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private listaUsuarios = new BehaviorSubject([]);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private router: Router,
    private alertController: AlertController
  ) { 
    this.creadDB();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  dbStatus() {
    return this.isDBReady.asObservable();
  }

  async presentAlert(header: string, message: string) { 
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  creadDB() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'cineforum.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch((error) => {
        this.presentAlert('Error al crear la base de datos:', JSON.stringify(error));
      });
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRoles, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaBanneo, []);
      await this.database.executeSql(this.tablaPeliculas, []);
      await this.database.executeSql(this.tablaTendencias, []);
      await this.database.executeSql(this.tablaComentariosPeliculas, []);
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Error al crear tablas', JSON.stringify(e));
      return;
    }
    try {
      await this.database.executeSql(this.registroRoles, []);
      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroBanneo, []);
      await this.database.executeSql(this.registroPeliculas, []);
      await this.database.executeSql(this.registroTendencias, []);
      await this.database.executeSql(this.registroComentariosPeliculas, []);
    } catch (e) {
      this.presentAlert('Error al insertar datos en tablas', JSON.stringify(e));
    }
    this.isDBReady.next(true);
  }

  async buscarUsuarios() {
    await this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.lengths; i++) {
          items.push({
            nombre: res.rows.item(i).nombre,
            email: res.rows.item(i).email,
            clave: res.rows.item(i).clave,
            descripcion: res.rows(i).descripcion,
            banneado: res.rows.item(i).banneado,
            rol: res.rows.item(i).rol,
            foto: res.rows.item(i).foto
          })
        }
      }
      this.listaUsuarios.next(items as any);
    }).catch(e => {
      this.presentAlert('Error buscarUsuarios', JSON.stringify(e));
    })
  }

  async buscarUsuario(nombre: string, clave: string): Promise<Usuario | null> {
    const query = `
      SELECT id, nombre, email, clave, descripcion, banneado, rol, foto
      FROM usuario
      WHERE nombre = ? AND clave = ?;
    `;
    try {
      console.log ('Ejecutando query', query, 'with parameters', [nombre, clave]);
      const res = await this.database.executeSql(query, [nombre, clave]);
      if (res.rows.length > 0) {
        const usuarioEncontrado: Usuario = {
            nombre: res.rows.item(0).nombre,
            email: res.rows.item(0).email,
            clave: res.rows.item(0).clave,
            descripcion: res.rows.item(0).descripcion,
            banneado: res.rows.item(0).banneado,
            rol: res.rows.item(0).rol,
            foto: res.rows.item(0).foto
        };
        console.log('Usuario encontrado: ', usuarioEncontrado);
        return usuarioEncontrado;
      } else {
        console.log('No se encontró ningún usuario');
        return null;
      }
    } catch (e) {
      console.error('Database error: ', JSON.stringify(e));
      this.presentAlert('Error al acceder a la base de datos', JSON.stringify(e));
      throw new Error('Error al acceder a la base de datos');
    }
  }

  existeEmail(correo: string): Observable<boolean> {
    const query = 
      `SELECT COUNT(*) AS count 
       FROM usuario 
       WHERE email = ?;
    `;

    return from(this.database.executeSql(query, [correo])
      .then(result => {
        return result.rows.item(0).count > 0;
      })
      .catch(e => {
        this.presentAlert('Error validando correo', JSON.stringify(e))
        throw new Error('Error al validar el correo')
      }))
  }

  existeNombre(nombre: string): Observable<boolean> {
    const query = 
      `SELECT COUNT(*) AS count 
       FROM usuario 
       WHERE nombre = ?;
    `;

    return from(this.database.executeSql(query, [nombre])
      .then(result => {
        return result.rows.item(0).count > 0;
      })
      .catch(e => {
        this.presentAlert('Error validando nombre', JSON.stringify(e))
        throw new Error('Error al validar el nombre')
      }))
  }

  async cambiarClave(id: number, claveNueva: string): Promise<void> {
    try {
      await this.database.executeSql(
       `UPDATE usuario 
        SET clave = ? 
        WHERE id = ?;
        `, [claveNueva, id]);
    } catch (e) {
      console.error('Error al cambia la clave: ', JSON.stringify(e))
    }
  } 

  async registarUsuario(usuario: Usuario): Promise<any> {
    try { 
      const emailExiste = await firstValueFrom(await this.existeEmail(usuario.email));
      const nombreExiste = await firstValueFrom(await this.existeNombre(usuario.nombre));
      var errores = { emailDuplicado: false, nombreDuplicado: false };

      console.log('Email existe: ', emailExiste)
      console.log('Nombre existe: ', nombreExiste)

      if (emailExiste) {
        errores.emailDuplicado = true;
      }

      if (nombreExiste) {
        errores.nombreDuplicado = true;
      }

      if (errores.emailDuplicado || errores.nombreDuplicado) {
        throw errores;
      }

      const insert = `
        INSERT INTO usuario (nombre, email, clave, descripcion, banneado, rol)
        VALUES (?, ?, ?, ?, ?, ?);
      `;

      await this.database.executeSql(insert, [
        usuario.nombre,
        usuario.email,
        usuario.clave,
        usuario.descripcion,
        0,
        2
      ]);

      // Actualizar la lista
      await this.buscarUsuarios();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}