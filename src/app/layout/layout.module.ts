import {NgModule} from '@angular/core';
import {LayoutAdminComponent} from './layout-admin/layout-admin.component';
import {LayoutUserComponent} from './layout-user/layout-user.component';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {SharedModule} from "../shared/shared.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import { CommonModules } from '../modules/common.module';

@NgModule({
  declarations: [
    LayoutAdminComponent,
    LayoutUserComponent,
    LayoutComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        RouterOutlet,
        CommonModules,
        RouterLink
    ],
  providers: []
})
export class LayoutModule {
}
