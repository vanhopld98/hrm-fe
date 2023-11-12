import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {catchError, map, throwError} from "rxjs";
import {UserProfile} from "../model/userProfile";

const MY_PROFILE = `${environments.domain}` + '/user/v1/my-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getMyProfile() {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');

    return this.http.get<UserProfile>(MY_PROFILE, {headers})
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
