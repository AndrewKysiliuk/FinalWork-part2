import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../classes/user';
import { HttpAuthRegService } from '../../Services/http-auth-reg.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less', '../authorization/authorization.component.less']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();

  passPattern = '^(?=.*\\d)(?=.*[a-z])((?=.*[A-Z])|(?=.*\\W+))[0-9a-zA-Z\\W]{8,}$';

  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern(this.passPattern)]),
    name : new FormControl('', [Validators.required]),
    phone : new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
  });

  get email() {
    return this.form.get('email');
  }
  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(private service: HttpAuthRegService,
              private router: Router,
              public snackBar: MatSnackBar) { }

  getErrorMessage(type: string) {
    switch (type) {
      case 'name': {
        return this.name.hasError('required') ? 'Поле Ім\'я обов\'язкове' : '';
        break;
      }
      case 'mail': {
        return this.email.hasError('required') ? 'Поле Email обов\'язкове' :
          this.email.hasError('email') ? 'Неправильно введений Email' :
            '';
        break;
      }
      case 'pass': {
        return this.password.hasError('required') ? 'Поле пароль обов\'язкове' :
          this.password.hasError('pattern') ? 'Пароль має складатися з мінімум 8 символів, містити принаймні ' +
            '1 маленьку букву, 1 число та 1 велику букву або спец. символ (!@#$%...)' : '';
        break;
      }
      case 'phone': {
        return this.phone.hasError('required') ? 'Поле номер телефону обов\'язкове' :
          this.phone.hasError('pattern') ? 'Неправильно введений номер телефону' :
            '';
        break;
      }
    }
  }

  registration() {
    this.user.name = this.name.value;
    this.user.email = this.email.value;
    this.user.phone = this.phone.value;
    this.user.password = this.password.value;
    this.service.registration(this.user).subscribe(
      resolve => {
        this.openSnackBar(resolve.toString());
        this.router.navigate(['authorization']);
      }
      ,
      error => {
        alert(error);
        this.email.setValue('');
        this.password.setValue('');
      }
    );
  }
  openSnackBar(message: string) {
    this.snackBar.open(message,  null, {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
