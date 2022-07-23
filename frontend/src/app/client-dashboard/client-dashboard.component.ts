import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  profileForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      birth:[''],
      craft:[''],
    })
  }
  ngOnInit(): void {
  }

  saveForm() {
    console.log('Form data is: ', this.profileForm.value)
  }

}
