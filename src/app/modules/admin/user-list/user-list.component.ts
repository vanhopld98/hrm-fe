import {Component, OnInit} from '@angular/core';
import {UsersResponse} from 'src/app/model/usersResponse';
import {AdminService} from 'src/app/service/admin.service';
import {AlertService} from 'src/app/service/alert.service';
import {HandleExceptionService} from 'src/app/service/handle-exception.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

export class UserListComponent implements OnInit {

  pageIndex = 0;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;

  constructor(private adminService: AdminService,
              private alertService: AlertService,
              private handleException: HandleExceptionService) {
    this.getUsers(this.pageSize, this.pageIndex);
  }

  ngOnInit(): void {

  }

  public usersResponse: UsersResponse;

  getUsers(pageSize: number, page: number) {
    this.loading = true;
    this.adminService.getUsers(pageSize, page).subscribe(
      response => {
        this.usersResponse = response;
        this.loading = false;
        this.listOfData = response.userProfileResponses.sort((s1, s2) => {
          const s1HasAdminRole = s1.roles.includes("ROLE_ADMIN");
          const s2HasAdminRole = s2.roles.includes("ROLE_ADMIN");
          if (s1HasAdminRole && !s2HasAdminRole) {
            return -1;
          } else if (!s1HasAdminRole && s2HasAdminRole) {
            return 1;
          } else {
            return 0;
          }
        });
        this.total = response.totalRecord;
      },
      exception => {
        this.handleException.handleException(exception);
      }
    );
  }

}
