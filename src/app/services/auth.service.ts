import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../entity/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  constructor(public afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => {
      this.isLogged = user;
    })
  }

  //funcion asyncrona, callbacks, promesas, async y await EcamScipt JS, suscriptiores y observadores 
  //periferico externo, lectura de archivo, api, libreri fuera del proyecto, latencia red ,etc 
  async onLogin(user: User) {
    //cuando se trabaja con funciones asincronas como un lenguaje como java o c# tenemos que manejar
    //excepciones con try catch 
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(
        user.email, user.password
      );
    } catch (error)
    {
      console.log('Login Catch', error);
    }

  }

  async onRegister(user: User){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email, user.password
      );
    } catch (error) {
      console.log('Register Catch', error);
    }
  }

}
