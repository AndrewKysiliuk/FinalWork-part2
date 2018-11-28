import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {User} from '../../classes/user';
import {HttpClientService} from '../../Services/HttpClientService';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less']
})
export class EditUserComponent implements OnInit {

  userName;
  userPhone;
  imgUrl;

  defaultAvatar = '../../assets/default_user.png';
  user: User = new User();
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<EditUserComponent>,
              private service: HttpClientService,
              private snackBar: MatSnackBar) {
  }

  close() {
    this.dialogRef.close();
  }
  save() {
    this.user.name = this.userName;
    this.user.phone = `+380${this.userPhone}`;
    this.user.img = this.imgUrl;
    this.service.userUpdate(this.user).subscribe(
      ok => {
      this.snackBar.open('Запис успішно редаговано', null, {duration: 2000});
      this.dialogRef.close();
    },
      err => {
        alert('Помилка під час редагування запису');
        this.dialogRef.close();
      });
  }

  ngOnInit() {
    this.user = this.data.user;
    if (this.user.phone) {
      const phone = this.user.phone.toString().split('');
      phone.splice(0, 4);
      this.userPhone = phone.join('');
    }
    this.userName = this.user.name;
    this.imgUrl = this.user.img;
  }

}
