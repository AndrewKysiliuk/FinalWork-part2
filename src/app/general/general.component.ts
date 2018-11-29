import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../Services/HttpClientService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.less']
})

export class GeneralComponent implements OnInit {
  category: Category[]  = [];
  constructor(private http: HttpClientService,
              private router: Router,
              private ar: ActivatedRoute) {}

  ngOnInit() {
    this.http.httpGet().subscribe((data: Category[]) => {
      this.category = data;
      if (this.ar.children.length === 0) {
        this.router.navigateByUrl(`home/${this.category[0].category}`);
      }
    });
  }
}

export interface Category {
  title: string;
  category: string;
}
