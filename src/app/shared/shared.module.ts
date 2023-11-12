import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterLink} from "@angular/router";
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
  ],
    exports: [
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
    ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class SharedModule {
}
