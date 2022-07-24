import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { ClientModel } from './client.model';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  clientForm: FormGroup
  client = new ClientModel()
  clientData: ClientModel[]
  editingClient = false
  invalidForm = false
  @ViewChild('cancelButton') cancelButton: ElementRef<HTMLElement>

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {}
  ngOnInit(): void {
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
    })
  }

  addClient() {
    this.parseClientValues()
    this.validateEmptyFields()
    if(!this.invalidForm) {
      this.clientService.addClient(this.client).subscribe(res => {
        alert("Klient został dodany")
        this.cleanAfterSave()
      },
        err => {console.log("ERROR occured while tried to add client")})
    }
  }

  updateClient() {
    this.parseClientValues()
    this.validateEmptyFields()
    if(!this.invalidForm) {
      this.clientService.updateClient(this.client).subscribe(res => {
        alert("Zmiany zostały zapisane")
        this.cleanAfterSave()
      },
      err => {console.log("ERROR occured while tried to update client")})
    }
  }

  deleteClient(row: ClientModel) {
    this.clientService.deleteClient(row.id).subscribe(res => {
      alert("Klient " + row.firstName + " " + row.lastName + " został usunięty")
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
    this.getClients()
  }

  private validateEmptyFields() {
    if(!this.client.firstName || !this.client.lastName
      || !this.client.birth || !this.client.industry) {
        this.invalidForm = true
      }
    else {
      this.invalidForm = false 
    }
  }

  saveForm() {
    console.log('Form data is: ', this.clientForm.value)
  }
}
