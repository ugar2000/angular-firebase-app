import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  resetPass() {
    this.authService.ForgotPassword(this.form.get("email").value);
  }
}
