import {Component, Input, OnInit} from '@angular/core';
import {Task} from './task'
import {Lane} from "./lane";
import {TaskService} from "./task.service";

@Component({
    moduleId: module.id,
    selector: '[tasklist]',
    templateUrl: 'tasklist.component.html'
})
export class TaskListComponent implements OnInit{
    @Input()
    currentLane: Lane;
    tasks: Task[];

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.tasks =this.taskService.getTasks(this.currentLane);
    }

}
