import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  private adminsUrl = "http://localhost:3000/admins/"
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login:[''],
      password:['']
    })
  }

  login(): void {
    this.http.get<any>(this.adminsUrl).subscribe(res=> {
      const user = res.find((admin:any) => {
        return admin.login === this.loginForm.value.login && admin.password === this.loginForm.value.password
      })
    })
  }

}
