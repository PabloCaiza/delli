import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ImageUploaderDirective} from "../directives/image-uploader.directive";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    ImageUploaderDirective,
    ProgressSpinnerModule
  ],
  template: `
      <div class="dropzone" appImageUploader (dropFile)="onDropFile($event)">
          <label for="ingredientsFile" style="cursor: pointer;width: 100%;height: 100%">
              <input type="file" id="ingredientsFile" accept="image/png, image/jpg, image/jpeg"
                     (change)="onDropFile($event)">
              @if (!uploadingFile) {
                  <div style="cursor: pointer;width: 100%;height: 100%" class=" ">
                      <div style="width: fit-content; margin: 0 auto">
                          <i class="pi pi-cloud-upload" style="font-size: 5rem;margin-top: 2rem"></i>
                      </div>
                      <div style="width: fit-content; margin: 0 auto;">
                          <p><b>Click to upload</b> or drag and drop</p>
                      </div>
                      <div style="width: fit-content; margin: 0 auto;">
                          <p>SVG, PNG, JPG</p>
                      </div>
                  </div>
              } @else {
                  <div class="flex flex-column align-items-center justify-content-center"
                       style="width: 100%;height: 100%;background-color:var(--highlight-bg) ">
                      <div>
                          <p-progressSpinner></p-progressSpinner>
                      </div>
                      <h5 style="color:var(--highlight-text-color)">Uploading...</h5>
                  </div>

              }
          </label>
      </div>
  `,
  styles: `
  .dropzone {
    width: 100%;
    height: 17rem;
    padding: 0rem;
    border: dashed 1px #979797;
    cursor: pointer;
    input {
      display: none;
      width:100%;
      height: 100%;
    }
  }
  `
})
export class UploadImageComponent {
  recipeService: RecipeService = inject(RecipeService);
  uploadingFile = false;
  @Output() searchRecipeEvent = new EventEmitter<Recipe[]>()

  onDropFile(file: File | Event) {
    console.log(file)
    if (file instanceof Event) {

      let file1 = (file.target as HTMLInputElement)?.files?.[0];
      if (!file1) return
      file = file1;
    }
    this.uploadingFile = true
    this.recipeService.searchByImage(file)
      .subscribe({
        next: (page) => {
          this.searchRecipeEvent.emit(page.content)
        },
        error: (err) => {
          this.uploadingFile = false;
        },
        complete: () => {
          this.uploadingFile = false;
        }
      })
  }

  protected readonly HTMLInputElement = HTMLInputElement;
}
