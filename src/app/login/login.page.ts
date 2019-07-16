import { Component, OnInit } from '@angular/core';
import { User } from '../entity/user.class';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(private authService: AuthService, private router: Router,
    private toastController: ToastController) { 
      this.user.email = 'jgamarro@bdgsa.net';
      this.user.password = '123456';
    }

  ngOnInit() {
  }

  async onLogin(){
    const resultado: any = await this.authService.onLogin(this.user);
    if (resultado.code)
    {
      return this.presentToast(resultado.message);
    }
    this.presentToast('Bienvenido');
    this.router.navigateByUrl('/admin');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    })
    toast.present();
  }

}
