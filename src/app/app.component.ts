import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navigateTo: string = 'recipe';

  constructor() {
    console.log('Constructor called!');
  }

  ngOnInit() {}

  onNavigate(navigateTo: string) {
    this.navigateTo = navigateTo;
  }
}
