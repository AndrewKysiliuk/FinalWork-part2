import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent} from '../general/item-list/item-list.component';
import { ItemCreateComponent} from '../general/item-create/item-create.component';
import { ItemPageComponent} from '../general/item-page/item-page.component';
import { GeneralComponent} from '../general/general.component';
import {HomeGuard} from '../Guards/home.guard';

const child: Routes = [
  {
    path: 'home/:category/:type', // create
    component: ItemCreateComponent
  },
  {
    path: 'home/:category/:id/:type', // edit
    component: ItemCreateComponent
  },
  {
    path: 'home',
    canActivate: [HomeGuard],
    component: GeneralComponent,
    children: [
      {
        path: ':category',
        component: ItemListComponent
      },
      {
        path: ':category/:id',
        component: ItemPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(child)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
