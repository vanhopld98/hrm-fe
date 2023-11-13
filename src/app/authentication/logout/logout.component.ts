import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {HandleExceptionService} from "../../service/handle-exception.service";
import {AlertService} from "../../service/alert.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  ngOnInit(): void {
    this.doLogout();
  }

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private handleException: HandleExceptionService,
              private alert: AlertService) {
  }

  doLogout(){
    this.authenticationService.logout().subscribe(res => {
      this.alert.alertSuccess('Đăng xuất thành công.')
      sessionStorage.clear();
      this.router.navigate(['/login'])
    }, error => {
      this.handleException.handleException(error);
    })
  }

}
