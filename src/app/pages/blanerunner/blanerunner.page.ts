import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-blanerunner',
  templateUrl: './blanerunner.page.html',
  styleUrls: ['./blanerunner.page.scss'],
  standalone: false
})
export class BlanerunnerPage implements OnInit {
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
    private toastController: ToastController
  ) { }

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

  ngOnInit() {
  }

}
