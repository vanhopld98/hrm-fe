import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environments} from "../../environments/environments";
import {catchError, map, throwError} from "rxjs";
import {HistoriesResponse, HistoryResponse} from "../model/historyResponse";

const HISTORY = `${environments.domain}` + '/user/v1/timekeeping/history';
const HISTORIES = `${environments.domain}` + '/user/v1/timekeeping/histories';
const CHECKIN = `${environments.domain}` + '/user/v1/timekeeping/checkin';
const CHECKOUT = `${environments.domain}` + '/user/v1/timekeeping/checkout';

@Injectable({
  providedIn: 'root'
})
export class TimekeepingService {

  constructor(private http: HttpClient) {
  }

  history() {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');

    return this.http.get<HistoryResponse>(HISTORY, {headers})
      .pipe(
        catchError(ex => {
          return throwError(ex);
        }),
        map(res => {
          return res;
        }));
  }

  histories(page: number, size: number) {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');

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

  checkin() {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');

    return this.http.post<any>(CHECKIN, null, {headers})
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map(res => {
          return res;
        })
      )
  }

  checkout() {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');

    return this.http.post(CHECKOUT, null, {headers})
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        map(res => {
          return res;
        })
      )
  }
}
