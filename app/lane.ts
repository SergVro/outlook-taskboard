import {Task} from './task';
import {ILaneConfig} from "./laneconfig";

export class Lane {
    private laneConfig: ILaneConfig;

    constructor(laneConfig: ILaneConfig) {
        this.laneConfig = laneConfig;
    }

    get title():string {
        return this.laneConfig.Title;
    }

    get name():string {
        return this.laneConfig.Name;
    }

    get limit():number {
        return this.laneConfig.Limit;
    }

    get sort():string {
        return this.laneConfig.Sort;
    }

    get restrict():string {
        return this.laneConfig.Restrict;
    }

    get owner():string {
        return this.laneConfig.Owner;
    }

    get CanArchiveTask(): boolean {
        return this.laneConfig.CanArchiveTask;
    }
}