import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Pelicula } from 'src/app/services/pelicula';
import { Comment } from 'src/app/services/comment';
import { Share } from '@capacitor/share';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.page.html',
  styleUrls: ['./pelicula.page.scss'],
  standalone: false,
})
export class PeliculaPage implements OnInit {
  pelicula?: Pelicula;
  comments: Comment[] = [];
  newComment: string = '';
  errorMessage: string = '';
  userRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  ratings: number[] = [];
  averageRating: number = 0;
  currentUserId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private dbService: DbService,
    private alertController: AlertController,
    private toastController: ToastController,
    private nativeStorage: NativeStorage
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.nativeStorage.getItem('usuario').then(result => {
      this.currentUserId = result.id;
    });
    if (id) {
      try {
        this.pelicula = await this.dbService.getPeliculaById(Number(id));
        this.comments = await this.dbService.getComentariosPelicula(Number(id));
        if (this.userRating) await this.dbService.getUserRating(Number(id), this.currentUserId);
      } catch (error) {
        console.error('Error loading movie:', error);
        this.presentAlert('Error', 'No se pudo cargar la película');
      }
    }
  }

  async shareMovie() {
    if (!this.pelicula) return;
    try {
      await Share.share({
        title: this.pelicula.titulo,
        text: `Te recomiendo ver ${this.pelicula.titulo} en CineForum`,
        dialogTitle: 'Compartir película'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  banPost(id: any) {
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id == id) {
        this.comments.splice(i, 1);
      }
    }

    this.presentToast("Publicación eliminada");
  }

  validateComment() {
    if (!this.newComment?.trim()) {
      this.errorMessage = 'El comentario no puede estar vacío';
    } else if (this.newComment.length < 5) {
      this.errorMessage = 'El comentario debe tener al menos 5 caracteres';
    } else if (this.newComment.length > 500) {
      this.errorMessage = 'El comentario no puede exceder los 500 caracteres';
    } else {
      this.errorMessage = '';
    }
  }

  async sendComment() {
    this.validateComment();
    if (this.errorMessage) return;
  
    if (!this.currentUserId || !this.pelicula) {
      this.presentAlert('Error', 'Debes iniciar sesión para comentar');
      return;
    }
  
    try {
      await this.dbService.addComentario(
        this.pelicula.id,
        this.currentUserId,
        this.newComment
      );
      
      // Refresh comments
      this.comments = await this.dbService.getComentariosPelicula(this.pelicula.id);
      
      // Clear input
      this.newComment = '';
      this.presentToast('Comentario publicado');
    } catch (error) {
      console.error('Error posting comment:', error);
      this.presentAlert('Error', 'No se pudo publicar el comentario');
    }
  }

  async rateMovie(rating: number) {
    if (!this.currentUserId || !this.pelicula) {
      this.presentAlert('Error', 'Debes iniciar sesión para calificar');
      return;
    }

    try {
      await this.dbService.setUserRating(this.pelicula.id, this.currentUserId, rating);
      this.userRating = rating;
      // Refresh movie data to get updated rating
      this.pelicula = await this.dbService.getPeliculaById(this.pelicula.id);
      this.presentToast('Calificación guardada');
    } catch (error) {
      console.error('Error rating movie:', error);
      this.presentAlert('Error', 'No se pudo guardar la calificación');
    }
  }

  calculateAverageRating() {
    const total = this.ratings.reduce((sum, rate) => sum + rate, 0);
    this.averageRating = this.ratings.length ? total / this.ratings.length : 0;
  }
}