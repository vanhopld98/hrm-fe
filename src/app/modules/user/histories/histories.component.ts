import {Component, OnInit} from '@angular/core';
import {HistoriesResponse, HistoryResponse} from "../../../model/historyResponse";
import {HandleExceptionService} from "../../../service/handle-exception.service";
import {TimekeepingService} from "../../../service/timekeeping.service";

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.css']
})
export class HistoriesComponent implements OnInit {

  ngOnInit(): void {
  }

  page = 0;
  size = 10;
  loading = true;
  total = 0;

  response: HistoriesResponse;
  histories: HistoryResponse[];

  constructor(private handleException: HandleExceptionService,
              private timekeepingService: TimekeepingService) {
    this.getHistoriesTimekeeping(this.page, this.size);
  }

  getHistoriesTimekeeping(page: number, size: number) {
    this.timekeepingService.histories(page, size).subscribe(response => {
      this.response = response;
      this.histories = response.timekeepingHistories;

      for (let i = 0; i < this.histories.length; i++) {
        if (!this.histories[i].workingTime) {
          this.histories[i].workingTimeStr = 0 + ' phút';
        } else if (this.histories[i].workingTime < 60) {
          this.histories[i].workingTimeStr = this.histories[i].workingTime + " phút"
        } else {
          let hour = Math.floor(this.histories[i].workingTime / 60);
          let min = this.histories[i].workingTime % 60;
          this.histories[i].workingTimeStr = hour + " giờ, " + min + " phút";
        }
      }

      this.total = response.totalRecord;
      this.loading = false;
    }, error => {
      this.handleException.handleException(error);
    })
  }

}
