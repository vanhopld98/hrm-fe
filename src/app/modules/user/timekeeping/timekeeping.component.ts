import {Component, OnInit} from '@angular/core';
import {NzCalendarMode} from "ng-zorro-antd/calendar";
import {UserService} from "../../../service/user.service";
import {TimekeepingService} from "../../../service/timekeeping.service";
import {HistoryResponse} from "../../../model/historyResponse";
import {HandleExceptionService} from "../../../service/handle-exception.service";
import {AlertService} from "../../../service/alert.service";

@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.css']
})
export class TimekeepingComponent implements OnInit {

  mode: NzCalendarMode = 'month';
  date = new Date();
  timekeepingHistoryResponse: HistoryResponse;
  workingTime: string;
  isCheckin: boolean = false;
  isCheckout: boolean = false;

  constructor(private timekeepingService: TimekeepingService, private handleError: HandleExceptionService, private alert: AlertService) {
    this.getTimekeepingHistory();
  }

  ngOnInit(): void {
  }

  checkin() {
    return this.timekeepingService.checkin().subscribe(() => {
      this.alert.alertSuccess('Chấm công thành công');
      this.getTimekeepingHistory();
    }, error => {
      this.handleError.handleException(error);
    })
  }

  checkout() {
    return this.timekeepingService.checkout().subscribe(() => {
      this.alert.alertSuccess('Chấm công thành công');
      this.getTimekeepingHistory();
    }, error => {
      this.handleError.handleException(error);
    })
  }

  getTimekeepingHistory() {
    this.timekeepingService.history().subscribe(response => {
      this.timekeepingHistoryResponse = response;

      if (response.isCheckin) {
        this.isCheckin = true;
      }

      if (response.isCheckout) {
        this.isCheckout = true;
      }

      if (!response.workingTime) {
        this.workingTime = 0 + ' phút';
      } else if (response.workingTime < 60) {
        this.workingTime = response.workingTime + " phút"
      } else {
        let hour = Math.floor(response.workingTime / 60);
        let min = response.workingTime % 60;
        this.workingTime = hour + " giờ, " + min + " phút";
      }

    }, error => {
      this.handleError.handleException(error);
    })
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

}
