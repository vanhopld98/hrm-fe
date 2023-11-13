import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";
import { LogoutComponent } from './logout/logout.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, NzIconModule, RouterLink
    ]
})
export class AuthenticationModule { }
