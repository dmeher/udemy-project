import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @HostBinding('class.open') openClass = false;
    constructor(private elementRef: ElementRef) {}

    @HostListener('document:click', ['$event']) toggleDropdown(eventData: Event) {
        this.openClass = this.elementRef.nativeElement.contains(eventData.target) ? !this.openClass : false;
    }
}