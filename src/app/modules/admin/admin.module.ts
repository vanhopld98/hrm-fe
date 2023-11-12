import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzPaginationModule,
    NzTableModule,
    NzIconModule,
  ]
})
export class AdminModule {

 }
