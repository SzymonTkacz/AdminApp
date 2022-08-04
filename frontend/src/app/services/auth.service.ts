import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginData } from '../login/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  status = 0
  private loginUrl = "http://localhost:8000/auth/login"
  private loginCheckUrl = 'http://localhost:8000/logincheck'
  constructor(private router: Router, private http: HttpClient) { }
  checkIfLoggedIn() {
    this.http.get(this.loginCheckUrl,{observe: 'response'}).subscribe(response => {
      if(response.status === 200) {
        this.router.navigate(['dashboard'])
      }
    })
  }

  login(loginForm: FormGroup) {
    this.http.post<LoginData>(this.loginUrl, loginForm.getRawValue()).subscribe((res) => {
      localStorage.setItem("Authorization", res.access_token);
      this.router.navigate(['dashboard'])
    })
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login']);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('Authorization')
    let request = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    })
    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {          
          localStorage.removeItem('Authorization');
          this.router.navigate(['login']);
          return;
        }
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        this.router.navigate(['error']);
      }
    }));
  }
}
