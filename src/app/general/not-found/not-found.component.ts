import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './not-found.component.html',
  styleUrls: ['./non-found.component.less']
})
export class NotFoundComponent implements OnInit {

  notFound = '../../../assets/404-home.png';
  constructor() { }

  ngOnInit() {
  }

}
