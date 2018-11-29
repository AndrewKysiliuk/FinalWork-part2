import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../Services/HttpClientService';
import {Recipe} from '../../classes/recipe';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DelItemComponent} from './del-item/del-item.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less']
})
export class ItemListComponent implements OnInit {

  category;
  delFlag = {'delete': false};
  recipe: Recipe[] = [];
  constructor(private ar: ActivatedRoute,
              private router: Router,
              private http: HttpClientService,
              private snackBar: MatSnackBar,
              private matDialog: MatDialog) { }


  createNew() {
    this.router.navigateByUrl(`home/${this.category}/create/new`);
  }

  delDialog(id: number) {
    const dialog = this.matDialog.open(DelItemComponent, {
      width: '540px',
      height: '200px',
      data: {flag: this.delFlag}
    });
    dialog.afterClosed().subscribe(() => {
      this.del(id);
    });
  }

  del(id: number) {
    if (this.delFlag.delete) {
      this.http.delRecord(this.category, id).subscribe(
        ok => {
          this.snackBar.open('Запис успішно видалено', null, {horizontalPosition: 'center', duration: 2000});
          this.http.httpGet(this.category).subscribe((data: Recipe[]) => this.recipe = data);
        },
        err => this.router.navigate(['404']));
    }
    this.delFlag.delete = false;
  }

  ngOnInit() {
    this.ar.params.subscribe(data => {
      this.category = data.category;
      this.http.httpGet(this.category).subscribe(
        (response: Recipe[]) => this.recipe = response,
        error => {
          console.log(error);
          this.router.navigate(['404']);
        }
      );
    });
  }

}
