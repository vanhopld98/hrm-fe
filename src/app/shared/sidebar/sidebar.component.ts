import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserProfile} from "../../model/userProfile";
import {HandleExceptionService} from "../../service/handle-exception.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name: String;
  user: UserProfile;
  isAdmin: boolean = false;

  constructor(private userService: UserService,
              private handleException: HandleExceptionService) {

  }

  ngOnInit(): void {
    this.getMyProfile();
    this.handleRole();
  }

  getMyProfile() {
    this.userService.getMyProfile().subscribe(response => {
      this.user = response;
      this.name = response.firstName + ' ' + response.lastName;
    }, error => {
      this.handleException.handleException(error);
    });
  }

  handleRole() {
    const dataRole = JSON.parse(sessionStorage.getItem('user'));
    dataRole.roles.forEach(item => {
      if (item === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
}
