import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Pelicula } from 'src/app/services/pelicula';
import { Comment } from 'src/app/services/comment';
import { Share } from '@capacitor/share';

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

  constructor(
    private route: ActivatedRoute,
    private dbService: DbService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        this.pelicula = await this.dbService.getPeliculaById(Number(id));
        this.comments = await this.dbService.getComentariosPelicula(Number(id));
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
    if (!this.newComment.trim()) {
      this.errorMessage = 'El comentario no puede estar vacío.';
    } else if (this.newComment.length < 5) {
      this.errorMessage = 'El comentario debe tener al menos 5 caracteres.';
    } else {
      this.errorMessage = '';
    }
  }

  sendComment() {
    this.validateComment();
    if (this.errorMessage) return;

    console.log('Comentario enviado:', this.newComment);
    this.newComment = '';
  }

  rateMovie(rating: number) {
    this.userRating = rating;
    this.ratings.push(rating);
    this.calculateAverageRating();
  }

  calculateAverageRating() {
    const total = this.ratings.reduce((sum, rate) => sum + rate, 0);
    this.averageRating = this.ratings.length ? total / this.ratings.length : 0;
  }
}