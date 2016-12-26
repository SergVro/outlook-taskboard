import {Component, OnInit} from '@angular/core';
import {Lane} from "./lane";
import {LaneService} from "./lane.service";

@Component({
    moduleId: module.id,
    selector: 'outlook-taskboard',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
    lanes: Array<Lane>;
    constructor(private laneService: LaneService) {
    }

    ngOnInit(): void {
        this.lanes = this.laneService.getLanes();
    }

}
