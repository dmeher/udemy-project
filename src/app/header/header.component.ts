import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    collapsed = true;
    @Output('navigate') navigateTo = new EventEmitter<string>();


    constructor() {}

    ngOnInit(): void {
    }

    onNavigate(navigateTo: string) {
      this.navigateTo.emit(navigateTo);
    }
}