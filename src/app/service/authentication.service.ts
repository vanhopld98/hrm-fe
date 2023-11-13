import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {environments} from "../../environments/environments";
import {LoginResponse} from "../model/loginResponse";
import {LoginRequest} from "../model/loginRequest";
import {ExceptionResponse} from "../model/exceptionResponse";

const LOGIN_URL = `${environments.domain}` + '/authentication/v1/login';
const LOGOUT_URL = `${environments.domain}` + '/authentication/v1/logout';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;
  public exception = new Observable<ExceptionResponse>();

  dataSubject = new BehaviorSubject<LoginResponse>(null);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(sessionStorage.getItem('user') || null));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(LOGIN_URL, request)
      .pipe(
        catchError(ex => {
          return throwError(ex);
        }),
        map(user => {
          sessionStorage.setItem('user', JSON.stringify(user));
          sessionStorage.setItem('token', user.accessToken);
          sessionStorage.setItem('username', request.username);
          this.currentUserSubject.next(user);
          this.dataSubject.next(user);
          return user;
        }));
  }

  logout() {
    const usernameStorage = sessionStorage.getItem('username');
    const request = {
      username: usernameStorage
    }

    return this.http.post(LOGOUT_URL, {request})
      .pipe(
        catchError(err => {
          return throwError(err)
        }),
        map(res => {
          return res;
        })
      )
  }

  nextDataSubject(value: any) {
    this.dataSubject.next(value);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

}
