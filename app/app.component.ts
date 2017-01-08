import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Lane} from "./lane";
import {LaneService} from "./lane.service";
import {DragulaService} from "ng2-dragula";
import {TaskService} from "./task.service";

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

    constructor(private laneService: LaneService, private taskService: TaskService, private dragulaService:DragulaService) {
        dragulaService.drop.subscribe((value:any) => {
            console.log(`drop: ${value[0]}`);
            this.onDrop(value.slice(1));
        });
    }

    onDrop(args: any) {

        let [e, el] = args;
        console.log(e);
        console.log(el);
        this.taskService.moveTask(e.getAttribute('data-entryid'), el.getAttribute('data-lanename'));
    }

    ngOnInit(): void {
        this.lanes = this.laneService.getLanes();
    }

    updateSearch(value: string): void {
        this.search = value;
    }

}
