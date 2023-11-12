import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TimekeepingComponent} from "./timekeeping/timekeeping.component";
import {UserGuard} from "src/app/authentication/helper/user-guard";
import {HomeComponent} from "./home/home.component";
import {HistoriesComponent} from "./histories/histories.component";

const routes: Routes = [
  {
    path: 'timekeeping',
    component: TimekeepingComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'histories',
    component: HistoriesComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
