import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:ClientDashboardComponent},
  {path: 'error', component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
