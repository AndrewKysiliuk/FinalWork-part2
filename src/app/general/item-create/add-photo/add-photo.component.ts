import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.less', '../../../user/edit-user/edit-user.component.less']
})
export class AddPhotoComponent implements OnInit {

  customImg;
  defaultPhoto = '../../../assets/default_img.svg';
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<AddPhotoComponent>) { }

  save() {
    this.data.recipe.img = this.customImg;
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.customImg = this.data.recipe.img;
  }
}
