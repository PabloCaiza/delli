import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";
import {NotFoundRecipeComponent} from "../not-found-recipe/not-found-recipe.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {CardModule} from "primeng/card";
import {SharedModule} from "primeng/api";
import {DividerModule} from "primeng/divider";
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    NotFoundRecipeComponent,
    ProgressSpinnerModule,
    CardModule,
    SharedModule,
    DividerModule,
    BadgeModule,
    ButtonModule,
    RouterLink
  ],
  template: `
      <p-button label="Regresar" [text]="true" routerLink="/"></p-button>
      @if (loadRecipe) {
          <p-progressSpinner></p-progressSpinner>
      } @else if (recipe) {
          <div>
              <h1 class="text-6xl">{{ recipe.title }}</h1>
              <h3>Duration: {{ recipe.duration }}</h3>
              <div class="flex align-items-center justify-content-center">
                  <img alt="Recipe Image" [src]="recipe.imageUrl" width="40%" height="auto"/>
              </div>
              <h3>Ingredients</h3>
              @for (ingredient  of recipe.ingredients;track $index) {
                  <div class="flex flex-row align-items-center m-2">
                      <i class="pi pi-check" style="font-size: 1rem;color: green"></i>
                      <p class="text-lg m-2">{{ ingredient }}</p>
                  </div>
              } @empty {
                  <li>Not found ingredients</li>
              }
              <h3>Steps</h3>
              @for (step  of recipe.steps;track $index) {
                  <div class="flex flex-row align-items-center m-2">
                      <p-badge [value]="Number($index+1).toString()" size="large" severity="warning"></p-badge>
                      <p class="text-lg m-2">{{ step }}</p>
                  </div>
              } @empty {
                  <div>Not found direction</div>
              }
          </div>
      } @else {
          <app-not-found-recipe></app-not-found-recipe>
      }
  `
})
export class RecipeDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  recipeService: RecipeService = inject(RecipeService);
  recipeId!: string;
  recipe!: Recipe
  loadRecipe = false

  constructor() {
    this.loadRecipe = true
    this.recipeId = this.route.snapshot.params["id"]
    this.recipeService.getRecipeDetail(this.recipeId)
      .subscribe({
        next: (r) => {
          this.recipe = r;
          console.log(this.recipe)
        },
        error: (err) => {
          console.error(err)
          this.loadRecipe = false
        },
        complete: () => {
          this.loadRecipe = false
        }
      })
  }

  protected readonly Number = Number;
  protected readonly toString = toString;
}
