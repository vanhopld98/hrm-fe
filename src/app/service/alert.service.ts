import {Injectable, OnInit} from '@angular/core';
import {SweetAlert2LoaderService} from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService implements OnInit{

  constructor() {
  }

  alertSuccess(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 2000
    });
  }

  alertError(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 2000
    });
  }

  ngOnInit(): void {

  }

}
