import {Injectable} from '@angular/core';
import {Lane} from "./lane";
import {ILaneConfig} from "./laneconfig";

@Injectable()
export class LaneService {

    lanesConfig : Array<ILaneConfig> = [
        { Name: '', Title: 'BACKLOG', Limit: 0, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: '', CanArchiveTask: true },
        { Name: 'InProgress', Title: 'IN PROGRESS', Limit: 5, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: '', CanArchiveTask: false },
        { Name: 'Next', Title: 'NEXT', Limit: 0, Sort: "[DueDate][Importance]", Restrict: "[Complete] = false", Owner: '', CanArchiveTask: false},
        { Name: 'Focus', Title: 'FOCUS', Limit: 0, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: '', CanArchiveTask: false},
        { Name: 'Waiting', Title: 'WAITING', Limit: 0, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: '', CanArchiveTask: false},
        { Name: 'Completed', Title: 'COMPLETED', Limit: 0, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: '', CanArchiveTask: true}
    ];

    lanes : Array<Lane> = [];

    getLanes(): Array<Lane> {

        if (this.lanes.length == 0) {
            for (let config of this.lanesConfig) {
                this.lanes.push(new Lane(config));
            }
        }
        return this.lanes;
    }
}