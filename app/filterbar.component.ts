import {Component, Input, HostBinding, Output, EventEmitter} from '@angular/core';

@Component({
    selector: '[filterbar]',
    templateUrl: 'filterbar.component.html'
})
export class FilterbarComponent  {

    private _search:string;

    @Input()
    get search():string {
        return this._search;
    }
    set search(value: string) {
        this._search = value;
        this.searchChange.emit(this._search);
    }

    @Output()
    searchChange = new EventEmitter();

    @HostBinding('class')
    classNames:string = 'col-md-12'

    createReport() {
        console.log("report");
    }

    resetSearch() {
        this.search = null;
    }

    hasSearchTerm():boolean {
        return !(this.search == null || this.search == "");
    }

}