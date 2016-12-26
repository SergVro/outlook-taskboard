import {Component, Input, HostBinding, OnInit} from '@angular/core';
import {Task} from './task';
import {Lane} from "./lane";
import {TaskService} from "./task.service";

@Component({
    moduleId: module.id,
    selector: '[lane]',
    templateUrl: 'lane.component.html'
})
export class LaneComponent implements OnInit{
    @Input()
    lane: Lane;

    @HostBinding('class')
    classNames:string = 'tasklane col-lg-2 col-md-3 col-sm-4 col-xs-6'
    private tasks: Task[];

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.tasks =this.taskService.getTasks(this.lane);
    }

}