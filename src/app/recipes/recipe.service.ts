import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    updatedRecipes = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        if(this.recipes) return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes.find((recipe) => {
            return recipe.id === id;
        });
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = [...recipes];
        this.updatedRecipes.next(this.recipes);
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        recipe = {'id': this.recipes.length + 1, ...recipe}
        this.recipes.push(recipe);
        this.updatedRecipes.next(this.recipes.slice());
    }

    updateRecipe(id: number, recipe: Recipe) {
        this.recipes[
            this.recipes.findIndex(recipe => {
                return recipe.id === id;
            })
        ] = {...recipe, 'id': id};
        this.updatedRecipes.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        const index = this.recipes.findIndex(recipe => {
            return recipe.id === id;
        });
        this.recipes.splice(index, 1);
        this.updatedRecipes.next(this.recipes.slice());
    }
}