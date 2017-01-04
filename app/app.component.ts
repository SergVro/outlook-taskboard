import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Lane} from "./lane";
import {LaneService} from "./lane.service";

@Component({
    selector: '[outlooktaskboard]',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
    lanes: Array<Lane>;
    private _search:string;

    @Input()
    get search(): string {
        return this._search;
    }
    set search(value: string) {
        this._search = value;
        this.searchChange.emit(this._search);
    }

    @Output()
    searchChange = new EventEmitter();

    constructor(private laneService: LaneService) {
    }

    ngOnInit(): void {
        this.lanes = this.laneService.getLanes();
    }

    updateSearch(value: string): void {
        this.search = value;
    }

}
