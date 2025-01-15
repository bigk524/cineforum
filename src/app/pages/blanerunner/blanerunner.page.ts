import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-blanerunner',
  templateUrl: './blanerunner.page.html',
  styleUrls: ['./blanerunner.page.scss'],
  standalone: false
})
export class BlanerunnerPage implements OnInit {
  userRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  ratings: number[] = [4, 5, 3, 5, 4]; // Ejemplo de calificaciones de otros usuarios
  averageRating: number = 0;

  newComment: string = '';
  errorMenssage: string = '';

  user: string = '';
  comments = [
    {
      id: '1',
      userName: 'Matias Ramirez',
      userPic: '/assets/lego1.jpg',
      date: '2025-01-11',
      content: "Blade Runner 2049 es una película impresionante, con una historia que te hace reflexionar sobre la humanidad y la tecnología. Los efectos visuales son alucinantes. Una secuela que no solo respeta la original, sino que la lleva a otro nivel y la actuación de Ryan Gosling es excelente. me hace decir Soy ese.",
      reactions: '14'
    },
    {
      id: '2',
      userName: 'Pepe Torres',
      userPic: '/assets/lego2.jpg',
      date: '2025-01-11',
      content: "la original era mejor",
      reactions: '0',
    }
  ];
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    })
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
      this.errorMenssage = 'El comentario no puede estar vacío.';
    } else if (this.newComment.length < 5) {
      this.errorMenssage = 'El comentario debe tener al menos 5 caracteres.';
    } else {
      this.errorMenssage = '';
    }
  }

  sendComment() {
    this.validateComment();
    if (this.errorMenssage) return; // Evita enviar si hay error

    // Aquí iría la lógica para enviar el comentario
    console.log('Comentario enviado:', this.newComment);
    this.newComment = ''; // Limpiar el campo después de enviar
  }
   // ⭐ Nueva función para calificar la película
   rateMovie(rating: number) {
    this.userRating = rating;
    this.ratings.push(rating);
    this.calculateAverageRating();
  }

  // ⭐ Cálculo del promedio de calificación
  calculateAverageRating() {
    const total = this.ratings.reduce((sum, rate) => sum + rate, 0);
    this.averageRating = this.ratings.length ? total / this.ratings.length : 0;
  }

  ngOnInit() {}
}





