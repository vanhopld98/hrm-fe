import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {ActivatedRoute} from "@angular/router";
import {UserProfile} from "../../../model/userProfile";
import {HandleExceptionService} from "../../../service/handle-exception.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  keycloakId: string
  response: UserProfile;
  username: string;

  ngOnInit(): void {
    this.keycloakId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserByKeycloakId(this.keycloakId);
    this.buildForm();
  }

  constructor(private adminService: AdminService,
              private activatedRoute: ActivatedRoute,
              private handleError: HandleExceptionService,
              private fb: FormBuilder) {
  }

  getUserByKeycloakId(keycloakId: string) {
    this.adminService.getUserByKeycloakId(keycloakId).subscribe(res => {
      this.response = res;
      this.username = res.username;
    }, error => {
      this.handleError.handleException(error);
    })
  }

  public formEdit: FormGroup = new FormGroup({
    password: new FormControl(''),
    address: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  buildForm() {
    this.formEdit = this.fb.group({
      password: new FormControl('', [Validators.required]),
      address: new FormControl(this.response.address, [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    })
  }

  editUser() {

  }

  get f(): { [key: string]: AbstractControl } {
    return this.formEdit.controls;
  }
}
