import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../service/admin.service";
import {AlertService} from "../../../service/alert.service";
import {HandleExceptionService} from "../../../service/handle-exception.service";
import {RegisterRequest} from "../../../model/registerRequest";

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  submitted: boolean = false;

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private adminService: AdminService,
              private alert: AlertService,
              private handleError: HandleExceptionService,
              private fb: FormBuilder) {
  }

  buildForm() {
    this.formRegister = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    })
  }

  public formRegister: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  addNewUser() {
    this.submitted = true;

    if (this.formRegister.invalid) {
      return;
    }

    const request: RegisterRequest = {
      username: this.formRegister.get('username')?.value,
      password: this.formRegister.get('password')?.value,
      address: this.formRegister.get('address')?.value,
      firstName: this.formRegister.get('firstName')?.value,
      lastName: this.formRegister.get('lastName')?.value,
      email: this.formRegister.get('email')?.value,
      phoneNumber: this.formRegister.get('phoneNumber')?.value,
    }

    console.log(request);

    this.adminService.register(request).subscribe(() => {
      this.alert.alertSuccess('Thêm mới tài khoản ' + request.username + ' thành công')
    }, error => {
      this.handleError.handleException(error);
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formRegister.controls;
  }
}
