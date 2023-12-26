import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {HousingLocation} from "../housing-location";
import {ImageModule} from "primeng/image";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    ImageModule,
    RouterModule
  ],
  template: `
      <p-card header="{{housingLocation.name}}" subheader="Card Subheader" [style]="{ width: '360px' }">
          <ng-template pTemplate="header">
              <p-image [src]="housingLocation.photo" alt="Image {{housingLocation.name}}" width="250"></p-image>
          </ng-template>
          <p>{{ housingLocation.city }}, {{ housingLocation.state }}</p>
          <a [routerLink]="['/details',housingLocation.id]">Learn More</a>
          <ng-template pTemplate="footer">
              <p-button label="Save" icon="pi pi-check"></p-button>
              <p-button label="Cancel" icon="pi pi-times" styleClass="p-button-secondary"
                        [style]="{ 'margin-left': '.5em' }"></p-button>
          </ng-template>
      </p-card>
  `,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;

}
