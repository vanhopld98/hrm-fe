import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {catchError, map, throwError} from "rxjs";
import {UsersResponse} from "../model/usersResponse";

const USERS = `${environments.domain}` + '/admin/v1/users';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {

  }

  getUsers(pageSize: number, page: number) {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');

    let params = new HttpParams()
      .set('page', page)
      .set('size', pageSize);

    return this.http.get<UsersResponse>(USERS, {headers, params})
      .pipe(
        catchError(ex => {
          return throwError(ex);
        }),
        map(response => {
          return response;
        })
      )
  }
}
