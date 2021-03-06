import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: String = '';
  email: String = '';
  busy: Promise<any>;
  esperando: Boolean;

  constructor(public router: Router, public authDataServise: AuthService, public toastController: ToastController) { }

  ngOnInit() {
    this.name = '';
    this.email = '';
    this.esperando = false;
  }

  registrar() {
    if ( !this.esperando ) {
      this.esperando = true;
      this.busy = this.authDataServise.register(this.name, this.email).then( r => {
        this.esperando = false;
        this.presentToastWithOptions('Enviamos tu contraseña a tu correo', 'middle', 'Aceptar', 'success','Guardado','save-outline','start').then(
          r_register => {
            r_register.onDidDismiss().then( r2 => {
              this.name = '';
              this.email = '';
              this.router.navigate(['/login']);
            });
          }
        );
      }).catch( e => {
        this.esperando = false;
        console.log(e);
      });
    }
  }

  async presentToastWithOptions(message, position, closeButtonText, color, title, buttonIcon, buttonSide) {
    const toast = await this.toastController.create({
      header: title,
      message: message,
      position: position,
      buttons: [
        {
          side: buttonSide,
          icon: buttonIcon,
          text: closeButtonText,
          handler: () => {
            
          }
        }
      ]
    });
    toast.present();
    return toast;
  }
}
