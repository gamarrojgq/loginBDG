import { Component, OnInit } from '@angular/core';
import { User } from '../entity/user.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  constructor() { }

  ngOnInit() {
  }

  onRegister(){

  }
}
