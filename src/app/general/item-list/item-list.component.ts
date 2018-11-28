import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../Services/HttpClientService';
import {Recipe} from '../../classes/recipe';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less']
})
export class ItemListComponent implements OnInit {

  category;
  recipe: Recipe[] = [];
  constructor(private ar: ActivatedRoute,
              private router: Router,
              private http: HttpClientService,
              private snackBar: MatSnackBar) { }


  createNew() {
    this.router.navigateByUrl(`home/${this.category}/create`);
  }

  del(id: number) {
    this.http.delRecord(this.category, id).subscribe(
      ok => {
        this.snackBar.open('Запис успішно видалено', null, {duration: 2000});
        this.http.httpGet(this.category).subscribe((data: Recipe[]) => this.recipe = data);
        },
          err => console.log(err));
  }

  ngOnInit() {
    this.ar.params.subscribe(data => {
      this.category = data.category;
      console.log(data);
      this.http.httpGet(this.category).subscribe(
        (response: Recipe[]) => this.recipe = response,
        // error => {
        //   console.log(error);
        //   this.router.navigate(['404']);
        // }
      );
    });
  }

}
