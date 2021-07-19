import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSub: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeSub = this.recipeService.updatedRecipes.subscribe(response => {
      this.recipes = response;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

}
