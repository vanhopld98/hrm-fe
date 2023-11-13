import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {catchError, map, throwError} from "rxjs";
import {UsersResponse} from "../model/usersResponse";
import {RegisterRequest} from "../model/registerRequest";
import {UserProfile} from "../model/userProfile";
import {HistoriesResponse} from "../model/historyResponse";

const USERS = `${environments.domain}` + '/admin/v1/users';
const HISTORIES = `${environments.domain}` + '/admin/v1/timekeeping/histories';
const USER_BY_KEYCLOAK_ID = `${environments.domain}` + '/admin/v1/user/';
const REGISTER = `${environments.domain}` + '/authentication/v1/register';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {

  }

  getUsers(pageSize: number, page: number) {
    let headers = this.buildHeaders();

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

  getUserByKeycloakId(keycloakId: string) {
    let headers = this.buildHeaders();

    return this.http.get<UserProfile>(USER_BY_KEYCLOAK_ID + keycloakId, {headers})
      .pipe(
        catchError(ex => {
          return throwError(ex);
        }),
        map(response => {
          return response;
        })
      )
  }

  register(request: RegisterRequest) {
    let headers = this.buildHeaders();

    return this.http.post(REGISTER, request, {headers})
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map(res => {
          return res
        })
      )
  }

  histories(page: number, size: number) {
    let headers = this.buildHeaders();

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<HistoriesResponse>(HISTORIES, {headers, params})
      .pipe(
        catchError(ex => {
          return throwError(ex);
        }),
        map(res => {
          return res;
        }))
  }

  private buildHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');
  }
}
