import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from "../../model/loginRequest";
import {AlertService} from "../../service/alert.service";
import {LoginResponse} from "../../model/loginResponse";
import {HandleExceptionService} from "../../service/handle-exception.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public user: LoginRequest;
  public submitted = false;
  public response: LoginResponse;
  private ROLE_ADMIN = 'ROLE_ADMIN';
  private ROLE_USER = 'ROLE_USER';
  public isRemember = false;

  constructor(private authentication: AuthenticationService,
              private router: Router,
              private fb: FormBuilder,
              private alertService: AlertService,
              private handleException: HandleExceptionService) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    let loginRemember = JSON.parse(localStorage.getItem('remember')) || {};
    this.formLogin = this.fb.group({
      username: new FormControl(loginRemember.username, [Validators.required]),
      password: new FormControl(loginRemember.password, [Validators.required]),
    })
  }

  login() {
    this.submitted = true;

    if (this.formLogin.invalid) {
      return;
    }

    const request = {
      username: this.formLogin.get('username')?.value,
      password: this.formLogin.get('password')?.value
    }

    this.authentication.login(request).subscribe(
      response => {
        /* Nếu người dùng ko có role thì không cho đăng nhập */
        if (response.roles.length === 0) {
          this.router.navigateByUrl('/login')
          this.alertService.alertError('Bạn không có quyền truy cập chức năng này. Vui lòng đăng nhập lại')
          return;
        }

        this.alertService.alertSuccess("Đăng nhập thành công")
        this.response = response;
        this.saveDataRememberUser(request);
        if (response.roles.includes(this.ROLE_ADMIN)) {
          this.router.navigate(['/']);
        } else if (response.roles.includes(this.ROLE_USER)) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigateByUrl('/login')
          this.alertService.alertError('Bạn không có quyền truy cập chức năng này. Vui lòng đăng nhập lại')
          return;
        }
      },
      exception => {
        this.handleException.handleException(exception);
      });
  }

  private saveDataRememberUser(request: { password: any; username: any }) {
    if (this.isRemember) {

      /* Nếu người dùng tích chọn nhớ tài khoản thì sẽ xoá tài khoản đang được lưu đi
       * rồi lưu lại tài khoản mới mà khách hàng đang đăng nhập */
      localStorage.removeItem('remember');
      let userRemember = {} as LoginRequest;
      userRemember.username = request.username;
      userRemember.password = request.password;
      localStorage.setItem('remember', JSON.stringify(userRemember));
    } else {
      localStorage.removeItem('remember');
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }

  onReset() {
    this.submitted = false;
    this.formLogin.reset();
  }

  remember(event: any) {
    this.isRemember = event.target.checked;
  }
}
