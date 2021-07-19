import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe: Recipe;
  recipeForm = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'imagePath': new FormControl(null, Validators.required),
    'description': new FormControl(null, Validators.required),
    'ingredients': new FormArray([], Validators.required)
  });
  formBuilder: FormBuilder = new FormBuilder();

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
    if(this.editMode) {
      this.recipe = this.recipeService.getRecipe(this.id);
      this.recipeForm.setValue({
        'name': this.recipe.name,
        'imagePath': this.recipe.imagePath,
        'description': this.recipe.description,
        'ingredients': []
      });
      this.recipe.ingredients.forEach(element => {
        const formgroup = new FormGroup({
          'name': new FormControl(element.name, Validators.required),
          'amount': new FormControl(element.amount, Validators.required)
        });
        (<FormArray>this.recipeForm.get('ingredients')).push(formgroup);
      });
    }
  }

  formIngredientData(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    const formGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(formGroup);
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onUpdateRecipe() {
    if(this.editMode) {
      this.recipeForm.value.ingredients.forEach(element => {
        element.amount = +element.amount;
      });
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onCancelRecipe() {
    this.router.navigate(['../']);
  }

}
