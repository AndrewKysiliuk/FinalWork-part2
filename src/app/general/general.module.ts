import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { GeneralComponent } from './general.component';
import { ShareModule } from '../share/share.module';
import { ItemListComponent } from './item-list/item-list.component';
import { HeaderComponent } from '../header/header.component';
import { GeneralRoutingModule } from '../routers/general-routing.module';


@NgModule({
  declarations: [
    HeaderComponent,
    ItemComponent,
    ItemCreateComponent,
    ItemPageComponent,
    GeneralComponent,
    ItemListComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    GeneralRoutingModule
  ],
  exports: [
    ItemComponent,
    ItemCreateComponent,
    ItemPageComponent,
    ItemListComponent,
    GeneralComponent,
  ]
})
export class GeneralModule { }
