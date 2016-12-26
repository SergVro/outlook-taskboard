import {Component, Input} from '@angular/core';
import {Task} from './task'

@Component({
    moduleId: module.id,
    selector: 'task',
    templateUrl: 'task.component.html'
})
export class TaskComponent  {
    @Input() task: Task;
    isOverdue() {

    }

    editTask() {

    }

    deleteTask() {

    }

    openOneNoteURL(){

    }
}