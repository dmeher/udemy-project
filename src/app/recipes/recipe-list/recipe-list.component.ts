import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.epicurious.com/photos/5732526f1877f76a0e20831c/master/pass/EP_05102016_PeruvianStyleRoastChicken_recipe_.jpg'),
    new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://assets.epicurious.com/photos/5732526f1877f76a0e20831c/master/pass/EP_05102016_PeruvianStyleRoastChicken_recipe_.jpg')
  ];
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(selectedRecipe: Recipe) {
    this.selectedRecipe.emit(selectedRecipe);
  }

}
