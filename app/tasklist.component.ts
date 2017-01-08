import {Component, Input, OnInit, HostBinding} from '@angular/core';
import {Task} from './task'
import {Lane} from "./lane";
import {TaskService} from "./task.service";
import undefined = Word.ImageFormat.undefined;

@Component({
    selector: '[tasklist]',
    templateUrl: 'tasklist.component.html'
})
export class TaskListComponent implements OnInit{
    @Input()
    currentLane: Lane;

    @Input()
    tasks: Task[];

    @HostBinding('class')
    classNames:string = 'panel-body tasklist list-unstyled';

    constructor(private taskService: TaskService){ }

    ngOnInit(): void {
        if (this.tasks == null) {
            this.tasks = this.taskService.getTasks(this.currentLane);
        }
    }

}
