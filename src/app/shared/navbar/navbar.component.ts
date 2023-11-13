import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {LoginResponse} from "../../model/loginResponse";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogin: LoginResponse;
  isAdmin = false;

  constructor(private authenticationService: AuthenticationService) {
    this.checkRoleAdmin();
  }

  ngOnInit(): void {

  }

  checkRoleAdmin() {
    this.userLogin = this.authenticationService.currentUserValue;
    if (this.userLogin.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
      return;
    }
  }

}
