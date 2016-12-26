import {Component, Input, HostBinding} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: '[filterbar]',
    templateUrl: 'filterbar.component.html'
})
export class FilterbarComponent  {
    @Input()
    search:string;

    @HostBinding('class')
    classNames:string = 'col-md-12'

    createReport() {
        console.log("report");
    }

    resetSearch() {
        this.search = undefined;
    }

}