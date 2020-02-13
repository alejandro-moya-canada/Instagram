import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      "email": new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      "nombre": new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      "apellido": new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      "nick": new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      "password": new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
    });
  }

  onSignUp() {

    let jsonUser = { 
      nombre: this.form.value.nombre, apellido: this.form.value.apellido, 
      email: this.form.value.email, nick: this.form.value.nick,
      password: this.form.value.password
    };

    let jsonAuth = { email: this.form.value.email, password: this.form.value.password };
    console.log("JSON DE LOS DATOS:   ", jsonUser);

    // envío los datos al servidor
    this.authService.createUser(jsonUser, jsonAuth);
  }

}
