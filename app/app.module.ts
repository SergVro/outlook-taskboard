import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import { AppComponent }  from './app.component';
import { FilterbarComponent }  from './filterbar.component';
import {LaneComponent} from "./lane.component";
import {TaskListComponent} from "./tasklist.component";
import {TaskComponent} from "./task.component";
import {LaneService} from "./lane.service";
import {TaskService} from "./task.service";
import {DragulaModule} from "ng2-dragula";

@NgModule({
  imports:      [ BrowserModule, FormsModule, DragulaModule ],
  declarations: [ AppComponent, FilterbarComponent, LaneComponent, TaskListComponent, TaskComponent ],
  bootstrap:    [ AppComponent ],
  providers: [LaneService, TaskService]

})
export class AppModule {

}
