import {Component, OnInit} from '@angular/core';
import {TimekeepingService} from "../../../service/timekeeping.service";
import {HandleExceptionService} from "../../../service/handle-exception.service";
import {HistoryResponse} from "../../../model/historyResponse";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  timekeepingHistoryResponse: HistoryResponse;
  workingTime: string;
  public dateCurrent = new Date();

  constructor(private timekeepingService: TimekeepingService,
              private handleError: HandleExceptionService) {
    this.getTimekeepingHistory();
  }

  ngOnInit(): void {
  }

  getTimekeepingHistory() {
    this.timekeepingService.history().subscribe(response => {
      this.timekeepingHistoryResponse = response;

      if (response.workingTime < 60) {
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

}
