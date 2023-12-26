import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipePage} from "./recipe-page";
import {Recipe} from "./recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private URL = "http://localhost:8080/recipes"

  constructor(private http: HttpClient) {
  }

  private getPagePrams(page: number, size: number) {
    let params = new HttpParams();
    params = params.append("page", page)
    params = params.append("size", size)
    return params;
  }

  getRecipes(page: number = 0, size: number = 12) {
    return this.http.get<RecipePage>(this.URL, {params: this.getPagePrams(page, size)});
  }

  getRecipeDetail(id: string) {
    return this.http.get<Recipe>(`${this.URL}/${id}`)
  }

  searchRecipeByTitle(title: string, page: number = 0, size: number = 12) {
    let params = this.getPagePrams(page, size);
    params = params.append('title', title)
    return this.http.get<RecipePage>(`${this.URL}/searchByTitle`, {params: params})
  }

  searchByImage(file: File, page: number = 0, size: number = 12) {
    let params = this.getPagePrams(page, size);
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<RecipePage>(`${this.URL}/searchByImage`, formData, {
      params: params
    })
  }
}
