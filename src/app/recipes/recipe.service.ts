import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    
    private recipes: Recipe[] = [
        new Recipe(
            1,
            'A-Test-Recipe', 
            'This is simply a test', 
            'https://assets.epicurious.com/photos/5732526f1877f76a0e20831c/master/pass/EP_05102016_PeruvianStyleRoastChicken_recipe_.jpg',
            [
                new Ingredient('ingredient 1', 2),
                new Ingredient('ingredient 2', 3)
            ]),
        new Recipe(
            2,
            'A-Test-Recipe-2', 
            'This is simply a test 2', 
            'https://assets.epicurious.com/photos/5732526f1877f76a0e20831c/master/pass/EP_05102016_PeruvianStyleRoastChicken_recipe_.jpg',
            [
                new Ingredient('ingredient 1', 1),
                new Ingredient('ingredient 2', 4)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes.find((recipe) => {
            return recipe.id === id;
        });
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}