import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, firstValueFrom, from, Observable } from 'rxjs';
import { Usuario } from './usuario';
import { Pelicula } from './pelicula';
import { Comment } from './comment';

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

  tablaRatigs = `
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pelicula INTEGER,
      id_usuario INTEGER,
      rating INTEGER,
      fecha DATE,
      FOREIGN KEY (id_pelicula) REFERENCES peliculas (id),
      FOREIGN KEY (id_usuario) REFERENCES usuario (id),
      UNIQUE(id_pelicula, id_usuario)
    );
  `;

  registroRoles = `
    INSERT OR IGNORE INTO roles (id, nombre) VALUES (1, 'admin'), (2, 'usuario');
  `;

  registroUsuario = `
    INSERT OR IGNORE INTO usuario (id, nombre, email, clave, descripcion, rol) VALUES 
    (1, 'admin', 'admin@cineforum.cl', 'admin', 'Administrador del sistema', 1),
    (2, 'pepe_torres', 'p.torres@email.com', '123456', 'Usuario registrado', 2),
    (3, 'juan_perez', 'j.perez@email.com', '123456', 'Usuario registrado', 2),
    (4, 'maria_gonzalez', 'm.gonzales@email.com', '123456', 'Usuario registrado', 2),
    (5, 'matias_ramirez', 'm.ramirez@email.com', '123456', 'Usuario registrado', 2),
    (6, 'jaime_rodriguez', 'j.rodriguez@email.com', '123456', 'Usuario registrado', 2);
  `;

  registroPeliculas = `
    INSERT OR IGNORE INTO peliculas 
    (id, titulo, genero, duracion, clasificacion, sinopsis, director, estreno, portada) VALUES
    (1, 'El Padrino', 'Drama', 175, '18+', 'La historia de la familia Corleone', 'Francis Ford Coppola', '1972-03-24', 'assets/El-padrino.jpg'),
    (2, 'El Padrino II', 'Drama', 202, '18+', 'La historia de la familia Corleone', 'Francis Ford Coppola', '1974-12-20', 'assets/Elpadrino2.jpg'),
    (3, 'Volver al Futuro', 'Ciencia Ficción', 116, '7+', 'Un joven viaja al pasado en un auto', 'Robert Zemeckis', '1985-07-03', 'assets/Volver_al_Futuro_Poster.jpg'),
    (4, 'Titanic', 'Drama', 195, '12+', 'Un barco se hunde en el Atlántico', 'James Cameron', '1998-01-23', 'assets/Titanic.jpg'),
    (5, 'El Señor de los Anillos: La Comunidad del Anillo', 'Fantasía', 178, '12+', 'Un anillo mágico debe ser destruído', 'Peter Jackson', '2001-12-19', 'assets/ElSenorDeLosAnillos.jpg'),
    (6, 'Rápido y Furioso', 'Acción', 106, '14+', 'Un policía se infiltra en carreras ilegales', 'Rob Cohen', '2001-06-22', 'assets/RapidoYFurioso.jpg');
  `;

  /* TAREA: < Copiar los comentarios viejos > */
  registroComentariosPeliculas = `
    INSERT OR IGNORE INTO comentarios_peliculas 
    (id, id_pelicula, id_usuario, comentario, fecha) VALUES 
    (1, 1, 2, 'Excelente película', '2021-06-01'),
    (2, 1, 3, 'Una obra maestra', '2021-06-02'),
    (3, 1, 4, 'Muy buena', '2021-06-03'),
    (4, 2, 2, 'Muy buena continuación', '2021-06-04'),
    (5, 2, 3, 'Excelente', '2021-06-05'),
    (6, 2, 4, 'Muy buena', '2021-06-06'),
    (7, 3, 2, 'Muy buena', '2021-06-07'),
    (8, 3, 3, 'Excelente', '2021-06-08'),
    (9, 3, 4, 'Muy buena', '2021-06-09'),
    (10, 4, 2, 'Excelente', '2021-06-10'),
    (11, 4, 4, 'Excelente', '2021-06-12'),
    (12, 5, 2, 'Excelente', '2021-06-13'),
    (13, 5, 3, 'Muy buena', '2021-06-14'),
    (14, 5, 4, 'Excelente', '2021-06-15');
  `;

  registroTendencias = `
    INSERT OR IGNORE INTO tendencias (id, id_pelicula, fecha) VALUES 
    (1, 1, '2021-06-01'), 
    (2, 2, '2021-06-02'), 
    (3, 3, '2021-06-03'), 
    (4, 4, '2021-06-04'), 
    (5, 5, '2021-06-05');
  `;

  registroBanneo = `
    INSERT OR IGNORE INTO banneo 
    (id, id_usuario, fecha, razon) VALUES 
    (1, 5, '2024-06-01', 'Comentarios ofensivos');
  `;

  registroRatings = `
  INSERT OR IGNORE INTO ratings (id, id_pelicula, id_usuario, rating, fecha) VALUES 
  -- El Padrino (ID: 1)
  (1, 1, 2, 5, '2024-06-01'),
  (2, 1, 3, 5, '2024-06-02'),
  (3, 1, 4, 4, '2021-06-03'),
  -- El Padrino II (ID: 2)
  (4, 2, 2, 5, '2024-06-04'),
  (5, 2, 3, 4, '2024-06-05'),
  (6, 2, 4, 5, '2024-06-06'),
  -- Volver al Futuro (ID: 3)
  (7, 3, 2, 4, '2024-06-07'),
  (8, 3, 3, 5, '2024-06-08'),
  (9, 3, 4, 4, '2024-06-09'),
  -- Titanic (ID: 4)
  (10, 4, 2, 4, '2024-06-10'),
  (11, 4, 3, 4, '2024-06-11'),
  (12, 4, 4, 3, '2024-06-12'),
  -- El Señor de los Anillos (ID: 5)
  (13, 5, 2, 5, '2024-06-13'),
  (14, 5, 3, 4, '2024-06-14'),
  (15, 5, 4, 5, '2024-06-15'),
  -- Rápido y Furioso (ID: 6)
  (16, 6, 2, 3, '2024-06-16'),
  (17, 6, 3, 4, '2024-06-17'),
  (18, 6, 4, 3, '2024-06-18');
`;

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private router: Router,
    private alertController: AlertController
  ) {
    this.creadDB();
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
      await this.database.executeSql(this.tablaRatigs, []);
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
      await this.database.executeSql(this.registroRatings, []);

      await this.buscarPeliculas();
      await this.buscarUsuarios();
    } catch (e) {
      this.presentAlert('Error al insertar datos en tablas', JSON.stringify(e));
    }
    this.isDBReady.next(true);
  }

  private listaUsuarios = new BehaviorSubject<Usuario[]>([]);

  fetchUsuario() {
    return this.listaUsuarios.asObservable();
  }


  async buscarUsuarios() {
    try {
      const res = await this.database.executeSql('SELECT * FROM usuario', []);
      const items: Usuario[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            email: res.rows.item(i).email,
            clave: res.rows.item(i).clave,
            descripcion: res.rows.item(i).descripcion,
            rol: res.rows.item(i).rol,
            foto: res.rows.item(i).foto
          });
        }
      }

      this.listaUsuarios.next([...items]);
    } catch (e) {
      console.error('Error in buscarUsuarios:', e);
      this.presentAlert('Error buscarUsuarios', JSON.stringify(e));
    }
  }

  async buscarUsuario(nombre: string, clave: string): Promise<Usuario | null> {
    const query = `
      SELECT id, nombre, email, clave, descripcion, rol, foto
      FROM usuario
      WHERE nombre = ? AND clave = ?;
    `;
    try {
      console.log('Ejecutando query', query, 'with parameters', [nombre, clave]);
      const res = await this.database.executeSql(query, [nombre, clave]);
      if (res.rows.length > 0) {
        const usuarioEncontrado: Usuario = {
          id: res.rows.item(0).id,
          nombre: res.rows.item(0).nombre,
          email: res.rows.item(0).email,
          clave: res.rows.item(0).clave,
          descripcion: res.rows.item(0).descripcion,
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

      const insert =
        `INSERT INTO usuario (nombre, email, clave, descripcion, rol)
       VALUES (?, ?, ?, ?, ?);
      `;

      await this.database.executeSql(insert, [
        usuario.nombre,
        usuario.email,
        usuario.clave,
        usuario.descripcion,
        2
      ]);

      // Actualizar la lista
      await this.buscarUsuarios();

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async bannearUsuario(id: number, razon: string) {
    const hoy = new Date();
    const query =
      `INSERT INTO banneo (id_usuario, fecha, razon)
       VALUES (?, ?, ?);`
    try {
      this.database.executeSql(query, [id, hoy.toISOString(), razon]);
    } catch (e) {
      console.error('Database error: ', JSON.stringify(e));
      this.presentAlert('Error al acceder a la base de datos', JSON.stringify(e));
      throw new Error('Error al acceder a la base de datos');
    }
  }

  private bannedUsers: Set<number> = new Set();

  async loadBannedUsers() {
    try {
      const result = await this.database.executeSql(
        'SELECT id_usuario FROM banneo GROUP BY id_usuario;',
        []
      );
      this.bannedUsers.clear();
      for (let i = 0; i < result.rows.length; i++) {
        this.bannedUsers.add(result.rows.item(i).id_usuario);
      }
    } catch (e) {
      console.error('Error loading banned users:', JSON.stringify(e));
    }
  }

  isUserBanned(userId: number): boolean {
    return this.bannedUsers.has(userId);
  }

  // Peliculas:

  private listaPeliculas = new BehaviorSubject<Pelicula[]>([]);

  fetchPeliculas() {
    return this.listaPeliculas.asObservable();
  }

  async buscarPeliculas() {
    return await this.database.executeSql(
      `SELECT p.*, ROUND(AVG(r.rating), 1) as rating
       FROM peliculas p 
       LEFT JOIN ratings r 
       ON p.id = r.id_pelicula
       GROUP BY p.id;
     `, []
    ).then(result => {
      let items: Pelicula[] = [];
      if (result.rows.length > 0) {
        for (let i = 0; i < result.rows.length; i++) {
          items.push({
            id: result.rows.item(i).id,
            titulo: result.rows.item(i).titulo,
            genero: result.rows.item(i).genero,
            duracion: result.rows.item(i).duracion,
            clasificacion: result.rows.item(i).clasificacion,
            sinopsis: result.rows.item(i).sinopsis,
            director: result.rows.item(i).director,
            estreno: result.rows.item(i).estreno,
            portada: result.rows.item(i).portada || 'assets/rollo.jpg',
            rating: result.rows.item(i).rating || 0
          })
        }
      }
      this.listaPeliculas.next(items as any);
    });
  }

  async getPeliculaById(id: number): Promise<Pelicula> {
    const query = `SELECT 
                    p.*,
                    ROUND(AVG(r.rating), 1) AS rating
                   FROM peliculas p                     
                   LEFT JOIN ratings r ON p.id = r.id_pelicula
                   WHERE p.id = ?
                   GROUP BY p.id`;
    try {
      const result = await this.database.executeSql(query, [id]);
      if (result.rows.length > 0) {
        return {
          id: result.rows.item(0).id,
          titulo: result.rows.item(0).titulo,
          genero: result.rows.item(0).genero,
          duracion: result.rows.item(0).duracion,
          clasificacion: result.rows.item(0).clasificacion,
          sinopsis: result.rows.item(0).sinopsis,
          director: result.rows.item(0).director,
          estreno: result.rows.item(0).estreno,
          portada: result.rows.item(0).portada || 'assets/rollo.jpg',
          rating: result.rows.item(0).rating || 0
        };
      }
      throw new Error('Película no encontrada');
    } catch (e) {
      this.presentAlert('Error al buscar pelicula', JSON.stringify(e));
      console.error('Error fetching movie:', JSON.stringify(e));
      throw e;
    }
  }

  async addPelicula(pelicula: Pelicula): Promise<void> {
    const query = `
      INSERT INTO peliculas (titulo, genero, duracion, clasificacion, sinopsis, director, estreno, portada)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    try {
      await this.database.executeSql(query, [
        pelicula.titulo,
        pelicula.genero,
        pelicula.duracion,
        pelicula.clasificacion,
        pelicula.sinopsis,
        pelicula.director,
        pelicula.estreno,
        pelicula.portada
      ]);
      await this.buscarPeliculas(); // Refresh movies list
    } catch (e) {
      console.error('Error adding movie:', e);
      throw e;
    }
  }

  // Comentarios
  async getComentariosPelicula(idPelicula: number): Promise<Comment[]> {
    const query = `
      SELECT c.*, u.nombre as nombre_usuario 
      FROM comentarios_peliculas c
      JOIN usuario u ON c.id_usuario = u.id
      WHERE c.id_pelicula = ?
      ORDER BY c.fecha DESC;
    `;
    try {
      const result = await this.database.executeSql(query, [idPelicula]);
      const comments: Comment[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        comments.push({
          id: result.rows.item(i).id,
          id_pelicula: result.rows.item(i).id_pelicula,
          id_usuario: result.rows.item(i).id_usuario,
          comentario: result.rows.item(i).comentario,
          fecha: result.rows.item(i).fecha,
          nombre_usuario: result.rows.item(i).nombre_usuario
        });
      }
      return comments;
    } catch (e) {
      console.error('Error fetching comments:', e);
      throw e;
    }
  }

  async addComentario(idPelicula: number, idUsuario: number, comentario: string): Promise<void> {
    const fecha = new Date().toISOString();
    const query = `
      INSERT INTO comentarios_peliculas (id_pelicula, id_usuario, comentario, fecha)
      VALUES (?, ?, ?, ?);
    `;
    try {
      await this.database.executeSql(query, [idPelicula, idUsuario, comentario, fecha]);
    } catch (e) {
      console.error('Error adding comment:', e);
      throw e;
    }
  }

  // Ratings

  async getUserRating(idPelicula: number, idUsuario: number): Promise<number> {
    const query = "SELECT rating FROM ratings WHERE id_pelicula = ? AND id_usuario = ?;";
    try {
      const result = await this.database.executeSql(query, [idPelicula, idUsuario]);
      if (result.rows.length > 0) {
        return result.rows.item(0).rating;
      }
      return 0;
    } catch (e) {
      console.error('Error getting user rating:', e);
      return 0;
    }
  }

  async setUserRating(idPelicula: number, idUsuario: number, rating: number): Promise<void> {
    const date = new Date().toISOString();
    const query = `
    INSERT OR REPLACE INTO ratings (id_pelicula, id_usuario, rating, fecha)
    VALUES (?, ?, ?, ?);
  `;
    try {
      await this.database.executeSql(query, [idPelicula, idUsuario, rating, date]);
      await this.updateMovieRating(idPelicula);
    } catch (e) {
      console.error('Error setting rating:', e);
      throw e;
    }
  }

  async updateMovieRating(idPelicula: number): Promise<void> {
    const query = `
    UPDATE peliculas 
    SET rating = (
      SELECT ROUND(AVG(rating), 1) 
      FROM ratings 
      WHERE id_pelicula = ?
    )
    WHERE id = ?;
  `;
    try {
      await this.database.executeSql(query, [idPelicula, idPelicula]);
      await this.buscarPeliculas(); // Refresh movies list
    } catch (e) {
      console.error('Error updating movie rating:', e);
      throw e;
    }
  }
}