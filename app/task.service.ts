import {Injectable} from '@angular/core';
import {Lane} from "./lane";
import {Task} from "./task";

declare var ActiveXObject: any;

@Injectable()
export class TaskService {

    outlookNS: any;

    constructor() {
        try {
            // check whether the page is opened in outlook app
            if (window.external !== undefined && window.external.OutlookApplication !== undefined) {
                var outlookApp = window.external.OutlookApplication;
            } else {
                // if it is opened via browser, create activex object
                // this should be supported only from IE8 to IE11.
                // IE Edge currently does not support ActiveXObject
                var outlookApp = new ActiveXObject("Outlook.Application");
            }
            this.outlookNS = outlookApp.GetNameSpace("MAPI");

        }
        catch(e) { console.log(e); }

    }

    getTasks(lane: Lane) {

        return this.getTasksFromOutlook(lane.name, lane.restrict, lane.sort, lane.owner);

    }

    getTasksFromOutlook (path: string, restrict: string, sort: string, owner: string) {
        let result: Array<Task> = [];
        // default restriction is to get only incomplete tasks
        if (restrict === undefined) { restrict = "[Complete] = false"; }

        var tasks = this.getOutlookFolder(path, owner).Items.Restrict(restrict);

        // sort tasks
        if (sort === undefined) { sort = "[Importance]"; }
        tasks.Sort(sort, true);

        var count = tasks.Count;
        for (let i = 1; i <= count; i++) {
            result.push({
                entryID: tasks(i).EntryID,
                subject: tasks(i).Subject,
                priority: tasks(i).Importance,
                startdate: tasks(i).StartDate,
                duedate: new Date(tasks(i).DueDate),
                sensitivity: tasks(i).Sensitivity,
                categories: tasks(i).Categories,
                notes: tasks(i).Body,
                status: this.taskStatus(tasks(i).Body),
                oneNoteTaskID: this.getUserProp(tasks(i), "OneNoteTaskID"),
                oneNoteURL: this.getUserProp(tasks(i), "OneNoteURL")
            });
        };

        return result;
    }

    getOutlookFolder(folderpath: string, owner: string) {
        let outlookNS = this.outlookNS;
        if ( folderpath === undefined || folderpath === '' ) {
            // if folder path is not defined, return main Tasks folder
            var folder = outlookNS.GetDefaultFolder(13);
        } else {
            // if folder path is defined
            if ( owner === undefined || owner === '' ) {
                // if owner is not defined, return defined sub folder of main Tasks folder
                var folder = outlookNS.GetDefaultFolder(13).Folders(folderpath);
            } else {
                // if owner is defined, try to resolve owner
                var recipient = outlookNS.CreateRecipient(owner);
                recipient.Resolve;
                if ( recipient.Resolved ) {
                    var folder = outlookNS.GetSharedDefaultFolder(recipient, 13).Folders(folderpath);
                } else {
                    return null;
                }
            }
        }
        return folder;
    }

    taskStatus(str: string) {
        //str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
        if ( str.match(/### STATUS:([\s\S]*?)###/) ) {
            var statmatch = str.match(/### STATUS:([\s\S]*?)###/);
            // remove empty lines
            str = statmatch[1].replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '');
            // replace line breaks with html breaks
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
            // remove multiple html breaks
            str = str.replace('<br><br>', '<br>');
        } else { str = ''; }
        return str;
    }

    // grabs values of user defined fields from outlook item object
    // currently used for getting onenote url info
    getUserProp(item: any, prop: string) {
        var userprop = item.UserProperties(prop);
        var value = '';
        if (userprop != null) {
            value = userprop.Value;
        }
        return value;
    }

    editTask(item: Task) {
        let taskitem = this.outlookNS.GetItemFromID(item.entryID);
        taskitem.Display();
        // bind to taskitem write event on outlook and reload the page after the task is saved
        eval("function taskitem::Write (bStat) {window.location.reload(); return true;}");
        // bind to taskitem beforedelete event on outlook and reload the page after the task is deleted
        eval("function taskitem::BeforeDelete (bStat) {window.location.reload(); return true;}");
    }
}