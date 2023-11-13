import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserListComponent} from "./user-list/user-list.component";
import {AdminGuard} from "src/app/authentication/helper/admin-guard";
import {AddNewUserComponent} from "./add-new-user/add-new-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {HistoriesAdminComponent} from "./histories/histories-admin.component";

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'add-new-user',
    component: AddNewUserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user/edit/:id',
    component: EditUserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'users/histories',
    component: HistoriesAdminComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
