import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent} from '../general/item-list/item-list.component';
import { ItemCreateComponent} from '../general/item-create/item-create.component';
import { ItemPageComponent} from '../general/item-page/item-page.component';
import { GeneralComponent} from '../general/general.component';
import {HomeGuard} from '../Guards/home.guard';

const child: Routes = [
  {
    path: 'home/:category/:id',
    canActivate: [HomeGuard],
    component: ItemPageComponent
  },
  {
    path: 'home/:category/:type/new', // create
    canActivate: [HomeGuard],
    component: ItemCreateComponent
  },
  {
    path: 'home/:category/:id/:type', // edit
    canActivate: [HomeGuard],
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
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(child)],
  exports: [RouterModule]
})
export class GeneralPageRoutingModule { }
