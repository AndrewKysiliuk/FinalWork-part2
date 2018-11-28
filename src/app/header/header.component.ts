import { Component, OnInit } from '@angular/core';
import {HttpClientService} from '../Services/HttpClientService';
import {User} from '../classes/user';
import {AuthService} from '../Services/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EditUserComponent} from '../user/edit-user/edit-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less', '../share/share.component.less']
})
export class HeaderComponent implements OnInit {

  currentDate: any;
  user: User = new User();
  defaultAvatar = '../../assets/default_user.png';
  constructor(private service: HttpClientService,
              private authServise: AuthService,
              private router: Router,
              private matDialog: MatDialog) {}

  editProfile() {
    this.matDialog.open(EditUserComponent, {
      width: '550px',
      height: '350px',
      data: {user: this.user}
    });
  }

  logOut() {
    this.authServise.remove();
    this.router.navigateByUrl('/authorization');
  }

  ngOnInit(): void {
    setInterval(() => { this.currentDate = Date.now(); }, 1000);
    this.service.getUser().subscribe((user: User) => this.user = user);
  }
}
