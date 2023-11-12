import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {AlertService} from "../service/alert.service";
import {TimekeepingService} from "../service/timekeeping.service";
import {HandleExceptionService} from "../service/handle-exception.service";
import {HistoryResponse} from "../model/historyResponse";
import {el} from "@fullcalendar/core/internal-common";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isAdmin = false;
  isUser = false;


  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alert: AlertService
              ) {
    this.checkLayoutUser();
  }

  ngOnInit(): void {
  }

  checkLayoutUser() {
    const userLogin = this.authenticationService.currentUserValue;

    if (!userLogin) {
      this.router.navigateByUrl("/login");
      this.alert.alertError('Hết phiên đăng nhập. Vui lòng đăng nhập lại!');
      return;
    }

    userLogin.roles.forEach(item => {
      if (!item) {
        this.router.navigateByUrl("/login");
        this.alert.alertError('Bạn không có quyền truy cập chức năng này. Vui lòng đăng nhập lại!');
      }

      if (item === 'ROLE_ADMIN') {
        this.isAdmin = true;
        this.router.navigateByUrl("/")
        return;
      } else {
        this.isUser = true;
        this.router.navigateByUrl("/home")
        return;
      }
    });
  }

}
