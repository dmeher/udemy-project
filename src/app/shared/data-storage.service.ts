import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    saveRecipes(recipes: Recipe[]) {
        this.http.post(
            'https://udemy-project-579c3-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe(response => {
            console.log("Recipes Saved!");
        });
    }

    fetchRecipes() {
        return this.http.get('https://udemy-project-579c3-default-rtdb.firebaseio.com/recipes.json').pipe(
            map(response => {
                let keyName = null;
                for(let key in response) {
                    keyName = key;
                }
                return response[keyName];
            }),
            tap(response => {
                this.recipeService.setRecipes(response);
            }),
            catchError(error => {
                return throwError(error.error.error);
            })
        );
    }
}