import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe";
import {CardModule} from "primeng/card";
import {NgOptimizedImage} from "@angular/common";
import {RouterModule} from '@angular/router'

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    CardModule,
    NgOptimizedImage,
    RouterModule
  ],
  template: `
      <p-card [header]="recipe.title" [subheader]="recipe.duration" id="recipe-card"
              [routerLink]="['/details',recipe.id]"
      >
          <ng-template pTemplate="header">
              <img alt="Recipe Image" [src]="recipe.imageUrl" width="auto" height="200px"/>
          </ng-template>
      </p-card>
  `,
  styles: ["#recipe-card{max-height: 150px !important;min-height: 150px !important;}"]
})
export class RecipeComponent {
  @Input() recipe!: Recipe;
}
