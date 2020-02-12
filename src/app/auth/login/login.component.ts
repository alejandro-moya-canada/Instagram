import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      "email": new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      "password": new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
    });
  }

  onLogin() {
    let jsonAuth = { email: this.form.value.email, password: this.form.value.password };
    console.log("JSON AUTH:   ", jsonAuth);

    this.authService.login(jsonAuth);
  }

}
