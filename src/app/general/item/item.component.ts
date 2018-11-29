import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../classes/recipe';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})

export class ItemComponent implements OnInit {
  @Input() item: Recipe;
  @Output() delId = new EventEmitter<number>();
  category;
  defaultImg = '../../../assets/default_img.svg';
  constructor(private ar: ActivatedRoute,
              private router: Router,
              ) { }

  edit(id: number) {
    this.router.navigateByUrl(`/home/${this.category}/${this.item.id}/edit`);
  }

  del() {
    this.delId.emit(this.item.id);
  }

  show() {
    this.router.navigateByUrl(`/home/${this.category}/${this.item.id}`);
  }

  ngOnInit() {
    this.ar.params.subscribe(category => this.category = category.category);
  }

}
