import {Component, Input} from '@angular/core';
import {Task} from './task'
import {TaskService} from "./task.service";

@Component({
    selector: 'task',
    templateUrl: 'task.component.html'
})
export class TaskComponent  {
    @Input()
    task: Task;

    @Input()
    isArchivable: boolean = false;
    isDeletable: boolean = true;
    isEditable: boolean = true;

    constructor(private taskService:TaskService) {

    }

    // grabs the summary part of the task until the first '###' text
    // shortens the string by number of chars
    // tries not to split words and adds ... at the end to give excerpt effect
    taskExcerpt(str: string, limit: number) {
        if ( str.indexOf('\r\n### ') > 0 ) {
            str = str.substring( 0, str.indexOf('\r\n###'));
        }
        // remove empty lines
        str = str.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '');
        if (str.length > limit) {
            str = str.substring( 0, str.lastIndexOf( ' ', limit ) );
            str = str.replace ('\r\n', '<br>');
            //if (limit != 0) { str = str + "..." }
        };
        return str;
    }

    isOverdue(strdate: string){
        let dateobj = new Date(strdate).setHours(0,0,0,0);
        let today = new Date().setHours(0,0,0,0);
        return {'task-overdue': dateobj < today, 'task-today': dateobj == today };
    };

    editTask() {
        this.taskService.editTask(this.task);
    }

    archiveTask() {
        this.taskService.archiveTask(this.task);
    }

    deleteTask() {
        this.taskService.deleteTask(this.task);
    }

    openOneNoteURL(url:string){
        window.event.returnValue=false;
        // try to open the link using msLaunchUri which does not create unsafe-link security warning
        // unfortunately this method is only available Win8+
        if(navigator.msLaunchUri){
            navigator.msLaunchUri(url);
        } else {
            // old window.open method, this creates unsafe-link warning if the link clicked via outlook app
            // there is a registry key to disable these warnings, but not recommended as it disables
            // the unsafe-link protection in entire outlook app
            window.open(url, "_blank").close();
        }
        return false;
    }
}