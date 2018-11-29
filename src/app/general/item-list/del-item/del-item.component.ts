import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-del-item',
  templateUrl: './del-item.component.html',
  styleUrls: ['./del-item.component.less']
})
export class DelItemComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<DelItemComponent>) {
  }

  del() {
    this.data.flag.delete = true;
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
