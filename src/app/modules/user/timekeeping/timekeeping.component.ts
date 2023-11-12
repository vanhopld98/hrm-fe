import {Component, OnInit} from '@angular/core';
import {NzCalendarMode} from "ng-zorro-antd/calendar";
import {CalendarOptions} from "@fullcalendar/core";

@Component({
  selector: 'app-timekeeping',
  templateUrl: './timekeeping.component.html',
  styleUrls: ['./timekeeping.component.css']
})
export class TimekeepingComponent implements OnInit{

  mode: NzCalendarMode = 'month';
  date = new Date();

  constructor(){

  }

  ngOnInit(): void {
  }

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

}
