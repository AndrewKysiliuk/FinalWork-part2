import { Component, OnInit } from '@angular/core';
import {HttpClientService} from '../Services/HttpClientService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.less']
})

export class GeneralComponent implements OnInit {
  category: Category[]  = [];

  constructor(private http: HttpClientService,
              private router: Router) {}

  addCategory(name: string) {
    this.category.push({title: name, category: 'some'});
  }


  ngOnInit() {
    this.http.httpGet().subscribe((data: Category[]) => {
      this.category = data;
      // this.router.navigate([`/home/${this.category[0].category}`]);
    });
  }
}

export interface Category {
  title: string;
  category: string;
}
