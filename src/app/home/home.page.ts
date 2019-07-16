import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private toastCtrl: ToastController) {}

  async showToast(){
    const toast = await this.toastCtrl.create({
      message: "hello from toast",
      duration: 2000
    });
    toast.present();
  }

}
