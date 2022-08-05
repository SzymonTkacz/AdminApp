import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkIfLoggedIn()
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login() {
    this.authService.login(this.loginForm)
  }

}
