import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserRoutingModule} from "./user-routing.module";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {TimekeepingComponent} from "./timekeeping/timekeeping.component";
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import { HomeComponent } from './home/home.component';
import { HistoriesComponent } from './histories/histories.component';


@NgModule({
  declarations: [
    TimekeepingComponent,
    HomeComponent,
    HistoriesComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        NzPaginationModule,
        NzTableModule,
        NzIconModule,
        NzCalendarModule,
    ]
})
export class UserModule {

 }
