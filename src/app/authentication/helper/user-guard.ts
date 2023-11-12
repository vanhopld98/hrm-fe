import {Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../../service/authentication.service";
import {AlertService} from "../../service/alert.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard {
  constructor(private authenticationService: AuthenticationService, private router: Router, private alert: AlertService) {
  }

  canActivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    const roles = currentUser.roles;
    if (!roles?.includes('ROLE_USER')) {
      this.router.navigateByUrl('/login');
      this.alert.alertError('Bạn không có quyền truy cập chức năng này!')
      return false;
    }
    return true;
  }

}
