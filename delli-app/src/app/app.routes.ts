import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DetailsComponent} from "./details/details.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

export const routes: Routes = [{
  path: '',
  component: HomeComponent,
  title: 'Home Page'
},
  {
    path: 'details/:id',
    component: RecipeDetailComponent,
    title: 'Recipe Detail Page'
  },
];
