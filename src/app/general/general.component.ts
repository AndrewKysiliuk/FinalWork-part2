import { Component, OnInit } from '@angular/core';
import {HttpClientService} from '../Services/HttpClientService';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.less']
})

export class GeneralComponent implements OnInit {
  category: Category[]  = [];
  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.http.httpGet().subscribe((data: Category[]) => {
      this.category = data;
    });
  }
}

export interface Category {
  title: string;
  category: string;
}
