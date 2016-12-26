import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent }  from './app.component';
import { FilterbarComponent }  from './filterbar.component';
import {LaneComponent} from "./lane.component";
import {FormsModule} from "@angular/forms";
import {TaskListComponent} from "./tasklist.component";
import {TaskComponent} from "./task.component";
import {LaneService} from "./lane.service";
import {TaskService} from "./task.service";

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, FilterbarComponent, LaneComponent, TaskListComponent, TaskComponent ],
  bootstrap:    [ AppComponent ],
  providers: [LaneService, TaskService]

})
export class AppModule {

}
