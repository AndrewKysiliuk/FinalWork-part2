import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../classes/recipe';
import {HttpClientService} from '../../Services/HttpClientService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.less', '../../share/share.component.less']
})
export class ItemPageComponent implements OnInit {

  defaultImg = '../../../assets/default_img.svg';
  category;
  id;
  recipe: Recipe = new Recipe();

  constructor(private service: HttpClientService,
              private ar: ActivatedRoute,
              private router: Router) { }

  goToEdit() {
    this.router.navigateByUrl(`home/${this.category}/${this.id}/edit`);
  }

  goBack() {
    this.router.navigateByUrl(`home/${this.category}`);
  }

  ngOnInit() {
    this.ar.params.subscribe( data => {
      this.id = data.id;
      this.category = data.category;
      this.service.httpGet(this.category, this.id).subscribe( (recipe: Recipe) => this.recipe = recipe,
        err => this.router.navigateByUrl('home/this/page/not/found'));
    });
  }

}
