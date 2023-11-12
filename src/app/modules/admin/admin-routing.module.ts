import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserListComponent} from "./user-list/user-list.component";
import { AdminGuard } from "src/app/authentication/helper/admin-guard";

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
