import {Injectable} from '@angular/core';
import {Lane} from "./lane";
import {Task} from "./task";
import {LaneService} from "./lane.service";

declare var ActiveXObject: any;

@Injectable()
export class TaskService {

    outlookNS: any;

    constructor(private laneService: LaneService) {
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

    addTask(lane: Lane) {
            // set the parent folder to target defined
            let tasksFolder = this.getOutlookFolder(lane.name, lane.owner);
            // create a new task item object in outlook
            let taskItem = tasksFolder.Items.Add();

            // add default task template to the task body
            //taskItem.Body = GENERAL_CONFIG.TASK_TEMPLATE;

            // display outlook task item window
            taskItem.Display();

            // bind to taskItem write event on outlook and reload the page after the task is saved
            eval("function taskItem::Write (bStat) {window.location.reload(); return true;}");
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
        let userprop = item.UserProperties(prop);
        let value = '';
        if (userprop != null) {
            value = userprop.Value;
        }
        return value;
    }

    editTask(item: Task) {
        let taskItem = this.outlookNS.GetItemFromID(item.entryID);
        taskItem.Display();
        // bind to taskItem write event on outlook and reload the page after the task is saved
        eval("function taskItem::Write (bStat) {window.location.reload(); return true;}");
        // bind to taskItem beforedelete event on outlook and reload the page after the task is deleted
        eval("function taskItem::BeforeDelete (bStat) {window.location.reload(); return true;}");
    }

    deleteTask(item: Task) {
        if ( window.confirm('Are you absolutely sure you want to delete this item?') ) {
            // locate and delete the outlook task
            let taskItem = this.outlookNS.GetItemFromID(item.entryID);
            taskItem.Delete();

            eval("function taskItem::BeforeDelete (bStat) {window.location.reload(); return true;}");

            // locate and remove the item from the array
            // var index = sourceArray.indexOf(item);
            // sourceArray.splice(index, 1);
        };
    }

    archiveTask(task: Task) {
        // locate the task in outlook namespace by using unique entry id
        var taskItem = this.outlookNS.GetItemFromID(task.entryID);

        // move the task to the main "tasks" folder first (if it is not already in)
        var tasksFolder = this.outlookNS.GetDefaultFolder(13);
        if (taskItem.Parent.Name != tasksFolder.Name ) {
            taskItem = taskItem.Move(tasksFolder);
        };

        // mark it complete
        taskItem.MarkComplete();
    }

    moveTask(taskEntryID:string, targetLaneName: string) {
        let targetLane: Lane = this.laneService.getLanes().filter(l => l.name === targetLaneName)[0];
        let taskFolder = this.getOutlookFolder(targetLaneName, targetLane.owner);

        // locate the task in outlook namespace by using unique entry id
        let taskItem = this.outlookNS.GetItemFromID(taskEntryID);

        // ensure the task is not moving into same folder
        if (taskItem.Parent.Name != targetLaneName ) {
            // move the task item
            taskItem =  taskItem.Move (taskFolder);

            // update entryID with new one (entryIDs get changed after move)
            // https://msdn.microsoft.com/en-us/library/office/ff868618.aspx
            //itemMoved.entryID = taskItem.EntryID;
        }

    }
}