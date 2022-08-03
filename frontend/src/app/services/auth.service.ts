import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { TOUCH_BUFFER_MS } from "@angular/cdk/a11y/input-modality/input-modality-detector";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private adminsUrl = "http://localhost:3000/admins/"
    constructor(private http: HttpClient) {}

    login() {
        this.http.get<any>(this.adminsUrl)
    }
}