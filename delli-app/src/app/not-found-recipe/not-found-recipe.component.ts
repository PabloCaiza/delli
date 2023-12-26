import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-recipe',
  standalone: true,
  imports: [],
  template: `
      <div class="flex align-items-center flex-column">
          <img src="/assets/images/sadchef.png" alt="image" style="padding-left: 10rem">
          <h3>No result found</h3>
          <p>We couldn't find what you're looking for</p>
      </div>`,
})
export class NotFoundRecipeComponent {

}
