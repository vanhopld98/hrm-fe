import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NzPaginationModule,
    NzTableModule,
    NzIconModule,
    UserModule,
    AdminModule,
    SharedModule
  ]
})
export class CommonModules {

 }
