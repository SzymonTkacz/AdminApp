import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';
import { ClientModel } from './client.model';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  clientForm !: FormGroup
  client = new ClientModel()
  clientData: ClientModel[]
  editingClient = false
  invalidForm = false
  invalidAge = false
  displayedColumns = ['firstName', 'lastName', 'birth', 'industry']
  dataSource !: MatTableDataSource<any>
  @ViewChild('cancelButton') cancelButton !: ElementRef<HTMLElement>
  @ViewChild('paginator') paginator !: MatPaginator
  @ViewChild(MatSort) matSort !: MatSort

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    if(!localStorage.getItem('Authorization')) {
      this.router.navigate(['login'])
    }
    this.getClients()
    this.clientForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      birth:[''],
      industry:[''],
    })
  }

  getClients() {    
    this.clientService.getClients().subscribe(res => {
      this.clientData = res;
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.matSort
    })
  }

  addClient() {
    this.parseClientValues()
    this.checkIfAdult()
    this.validateFields()
    if(!this.invalidForm && !this.invalidAge) {
      this.clientService.addClient(this.client).subscribe(res => {
        alert("The client has been added")
        this.cleanAfterSave()
      },
        err => {console.log("ERROR occurred while tried to add client")})
    }
  }

  updateClient() {
    this.parseClientValues()
    this.checkIfAdult()
    this.validateFields()
    if(!this.invalidForm && !this.invalidAge) {
      this.clientService.updateClient(this.client).subscribe(res => {
        alert("The client has been updated")
        this.cleanAfterSave()
      },
      err => {console.log("ERROR occurred while tried to update client")})
    }
  }

  deleteClient(row: ClientModel) {
    this.clientService.deleteClient(row.id).subscribe(res => {
      alert("The client " + row.firstName + " " + row.lastName + " has been deleted")
      this.getClients()
    })    
  }

  onEdit(row: ClientModel) {
    this.client.id = row.id
    this.clientForm.controls['firstName'].setValue(row.firstName)
    this.clientForm.controls['lastName'].setValue(row.lastName)
    this.clientForm.controls['birth'].setValue(row.birth)
    this.clientForm.controls['industry'].setValue(row.industry)
    this.editingClient = true
  }

  cancel() {
    this.clientForm.reset()
    this.editingClient = false
    this.invalidForm = false
    this.invalidAge = false
  }

  private parseClientValues() {
    this.client.firstName = this.clientForm.value.firstName
    this.client.lastName = this.clientForm.value.lastName
    this.client.birth = this.clientForm.value.birth
    this.client.industry = this.clientForm.value.industry
  }

  private cleanAfterSave() {
    this.cancelButton?.nativeElement?.click();
    this.clientForm.reset()
    this.editingClient = false
    this.invalidForm = false
    this.invalidAge = false
    this.getClients()
  }

  private validateFields() {
    if(!this.client.firstName || !this.client.lastName
      || !this.client.birth || !this.client.industry 
      || this.client.firstName?.length > 50 || this.client.lastName?.length > 50)
      {
        this.invalidForm = true
      }
    else {
      this.invalidForm = false 
    }
  }

  private checkIfAdult() {
    var birthday = new Date(this.clientForm.value.birth)
    if(birthday.getTime() > Date.now()) {
      this.invalidAge = true
    }
    var ageDifMs = Date.now() - birthday.getTime()
    var ageDate = new Date(ageDifMs)
    var age = Math.abs(ageDate.getUTCFullYear() - 1970)
    if(age < 18) {
      this.invalidAge = true
    }
    else {
      this.invalidAge = false
    }
  }

  logout() {
    this.authService.logout()
  }
}
