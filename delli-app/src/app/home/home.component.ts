import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {HousingLocationComponent} from "../housing-location/housing-location.component";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";
import {PaginatorModule, PaginatorState} from "primeng/paginator";
import {RecipeComponent} from "../recipe/recipe.component";
import {Observable} from "rxjs";
import {RecipePage} from "../recipe-page";
import {NotFoundRecipeComponent} from "../not-found-recipe/not-found-recipe.component";
import {DialogModule} from "primeng/dialog";
import {UploadImageComponent} from "../upload-image/upload-image.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    HousingLocationComponent,
    PaginatorModule,
    RecipeComponent,
    NotFoundRecipeComponent,
    DialogModule,
    UploadImageComponent,
  ],
  template: `

      <section>
          <div class="flex align-items-center justify-content-center">
              <input type="text" pInputText [(ngModel)]="searchedRecipeTitle" placeholder="Filter by Name"/>
              <p-button icon="pi pi-search" (click)="searchRecipeByTitle()"></p-button>
              <p-button icon="pi pi-camera" severity="secondary" (click)="showUploadImageDialog()"></p-button>
              <p-dialog [(visible)]="showUploadImage" [style]="{width: '50vw'}"
                        header="Search recipe by ingredients image">
                  <app-upload-image (searchRecipeEvent)="searchRecipeByImage($event)"></app-upload-image>
              </p-dialog>
          </div>
      </section>
      <p class="text-2xl font-bold text-center font-italic">{{ totalRecords }} suggested recipes</p>
      <section class="grid m-2">
          @for (r of recipes;track r.id) {
              <app-recipe [recipe]="r" class="md:col-4 sm:col-12 lg:col-3 "></app-recipe>
          } @empty {
              <app-not-found-recipe></app-not-found-recipe>
          }
      </section>
      <p-paginator [first]="0" [rows]="10" [totalRecords]="totalRecords"
                   (onPageChange)="onPageChange($event)"></p-paginator>



  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchedRecipeTitle = ''
  recipeService: RecipeService = inject(RecipeService)
  recipes: Recipe[] = [];
  totalRecords: number = 0;
  showUploadImage = false;

  searchRecipeByTitle() {
    const recipeObservable: Observable<RecipePage> = this.searchedRecipeTitle ?
      this.recipeService.searchRecipeByTitle(this.searchedRecipeTitle)
      : this.recipeService.getRecipes();
    recipeObservable
      .subscribe({
        next: (recipePage) => {
          this.totalRecords = recipePage.totalElements;
          this.recipes = recipePage.content;
        }
      })
  }

  searchRecipeByImage(recipesSearched: Recipe[]) {
    this.recipes = recipesSearched;
    this.showUploadImage = false;
  }

  onPageChange(event: PaginatorState) {
    const recipeObservable: Observable<RecipePage> = this.searchedRecipeTitle ?
      this.recipeService.searchRecipeByTitle(this.searchedRecipeTitle, event.page)
      : this.recipeService.getRecipes(event.page);
    recipeObservable
      .subscribe({
        next: (recipePage) => {
          this.totalRecords = recipePage.totalElements;
          this.recipes = recipePage.content;
        },
        error: err => console.log(err),
        complete: () => console.log("completed")
      })
  }

  showUploadImageDialog() {
    this.showUploadImage = true;
  }

  constructor() {
    this.recipeService.getRecipes()
      .subscribe({
        next: (recipePage) => {
          this.totalRecords = recipePage.totalElements;
          this.recipes = recipePage.content;
        },
        error: err => console.log(err),
        complete: () => console.log("completed")
      })
  }
}

