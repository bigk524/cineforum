import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
  standalone: false
})
export class RecuperarcontraPage implements OnInit {
  email: string = '';
  errorEmail: string = ''; // Variable para manejar errores de correo

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  enviar() {
    // Limpiar mensaje de error previo
    this.errorEmail = '';

    if (this.email === '') {
      this.errorEmail = 'Por favor, ingrese su correo electrónico.';
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      this.errorEmail = 'Por favor, ingrese una dirección de correo electrónico válida.';
      return;
    }

    // Configurar el enlace de restablecimiento de contraseña
        const resetLink = 'https://example.com/reset-password?email=' + encodeURIComponent(this.email);
    
        // Configurar los parámetros del correo
        const templateParams = {
          email: this.email,
          reset_link: resetLink,
          to_email: this.email, // Dirección de correo del usuario
        };

    // Llamar al servicio de EmailJS
    emailjs
      .send('service_1lj1kxb', 'template_gkufg9e', templateParams, 'uZw4YfdppiljaIHqe')
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('Correo enviado con éxito:', response.text);
          this.presentToast('¡Correo enviado! Revisa tu bandeja de entrada.');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al enviar correo:', error);
          this.errorEmail = 'Hubo un error al enviar el correo. Inténtalo de nuevo.';
        }
      );
  }

  ngOnInit() {}
}
