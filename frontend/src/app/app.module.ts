import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientDashboardComponent,
    LoginComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
