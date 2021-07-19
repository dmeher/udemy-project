import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RecipeService } from "../recipes/recipe.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    fetchSubscription: Subscription;

    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

    ngOnInit(): void {
    }

    onSaveRecipes() {
        this.dataStorageService.saveRecipes(this.recipeService.getRecipes());
    }

    onFetchRecipes() {
        this.fetchSubscription = this.dataStorageService.fetchRecipes().subscribe(
            res => {},
            err => {
                console.log(err);
            }
        );
    }

    ngOnDestroy() {
        this.fetchSubscription.unsubscribe();
    }
}
