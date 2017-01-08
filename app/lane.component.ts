import {Component, Input, HostBinding, OnInit, Output} from '@angular/core';
import {Task} from './task';
import {Lane} from "./lane";
import {TaskService} from "./task.service";

@Component({
    selector: '[lane]',
    templateUrl: 'lane.component.html'
})
export class LaneComponent implements OnInit{
    private _search: string;

    @Input()
    lane: Lane;

    @Input()
    get search(): string {
        return this._search;
    }

    set search(value: string) {
        this._search = value;
        this.updateFilteredTasks();
    }


    @HostBinding('class')
    classNames:string = 'tasklane col-lg-2 col-md-3 col-sm-4 col-xs-6'

    tasks: Task[];

    get filteredTasks():Task[] {
        return this._filteredTasks;
    }
    set filteredTasks(value: Task[]) {
        this._filteredTasks = value;
    }

    private _filteredTasks: Task[];

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.updateTasks();
    }

    addTask() {
        this.taskService.addTask(this.lane);
    }

    private updateTasks() {
        this.tasks = this.taskService.getTasks(this.lane);
        this.updateFilteredTasks();
    }

    private updateFilteredTasks() {
        if (this.tasks == null) {
            this.filteredTasks = [];
        } else if (this._search) {
            this.filteredTasks = this.tasks.filter(t => t.subject.toLowerCase().includes(this._search.toLowerCase())
            || t.notes.toLowerCase().includes(this._search.toLowerCase()))
        }
        else
        {
            this.filteredTasks = this.tasks;
        }
    }


}