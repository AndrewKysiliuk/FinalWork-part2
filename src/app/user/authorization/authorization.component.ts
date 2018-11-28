import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { HttpAuthRegService } from '../../Services/http-auth-reg.service';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent {

  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    pass : new FormControl('', [Validators.required]),
  });

  passError = false;
  logError = false;

  get email() {
    return this.form.get('email');
  }
  get pass() {
    return this.form.get('pass');
  }

  constructor(private router: Router,
              private service: HttpAuthRegService,
              private  as: AuthService) { }

  getErrorMessage(type: string) {
    if (type === 'mail') {
      return this.email.hasError('required') ? 'Поле Email обов\'язкове' :
        this.email.hasError('email') ? 'Неправильно введений Email' :
          '';
    } else if (type === 'pass') {
      return this.pass.hasError('required') ? 'Поле пароль обов\'язкове' : '';
    }
  }

  authorization() {
    this.service .authorization({'email': this.email.value, 'password': this.pass.value}).subscribe(
      res => {
        this.as.create(res.toString());
        this.router.navigate([`home`]);
        },
      err => {
        if (err === 'Invalid password') {
          this.passError = true;
          setTimeout(() => {
              this.pass.setValue('');
              this.passError = false;
            }
            , 2000);
        } else if ( err === 'User not found') {
          this.logError = true;
          setTimeout(() => {
            this.logError = false;
            this.email.setValue('');
            this.pass.setValue('');
          }, 2000);
        }
      }
      );
  }

}
