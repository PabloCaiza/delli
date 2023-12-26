import {Component, inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {HousingService} from "../housing.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
      <div>
          <form [formGroup]="applyForm" (submit)="submitAplication()">
              <label for="first-name">Fist Name</label>
              <input id="first-name" type="text" formControlName="fistName">
              <label for="lastName">Last Name</label>
              <input id="lastName" type="text" formControlName="lastName">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email">
              <button type="submit" class="primary">Apply Now</button>
          </form>
      </div>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService = inject(HousingService);
  housingLocationId = 0;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id'])
  }

  submitAplication() {
    this.housingService.submitApplication(this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '')
  }
}
