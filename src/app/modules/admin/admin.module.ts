import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditUserComponent } from './edit-user/edit-user.component';
import { HistoriesAdminComponent } from './histories/histories-admin.component';

@NgModule({
  declarations: [
    UserListComponent,
    AddNewUserComponent,
    EditUserComponent,
    HistoriesAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzPaginationModule,
    NzTableModule,
    NzIconModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule {

 }
