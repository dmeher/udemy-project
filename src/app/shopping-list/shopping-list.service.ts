import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    changedIngredients = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Potatoes', 5),
        new Ingredient('Tomatoes', 9),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.changedIngredients.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.changedIngredients.next(this.ingredients.slice());
    }
}