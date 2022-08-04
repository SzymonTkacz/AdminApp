import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginData } from './login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  private loginUrl = "http://localhost:8000/auth/login"
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) { }

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
