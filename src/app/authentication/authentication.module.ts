import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzIconModule} from "ng-zorro-antd/icon";



@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, NzIconModule
    ]
})
export class AuthenticationModule { }
