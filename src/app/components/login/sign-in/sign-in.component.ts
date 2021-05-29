import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {faGooglePlusG} from '@fortawesome/fontawesome-free-brands';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  faGoogle = faGooglePlusG;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {

  }

  deflogin() {
    this.authService.SignIn(this.form.get('username').value, this.form.get('password').value);
  }

}
