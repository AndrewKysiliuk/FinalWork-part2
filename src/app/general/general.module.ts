import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { GeneralComponent } from './general.component';
import { ShareModule } from '../share/share.module';
import { ItemListComponent } from './item-list/item-list.component';
import { HeaderComponent } from '../header/header.component';
import { GeneralPageRoutingModule } from '../routers/general-page-routing.module';
import { DelItemComponent } from './item-list/del-item/del-item.component';
import { AddPhotoComponent } from './item-create/add-photo/add-photo.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ItemComponent,
    ItemCreateComponent,
    ItemPageComponent,
    GeneralComponent,
    ItemListComponent,
    DelItemComponent,
    AddPhotoComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    ShareModule,
    GeneralPageRoutingModule
  ],
  entryComponents: [DelItemComponent, AddPhotoComponent],
  exports: [
    ItemComponent,
    ItemCreateComponent,
    ItemPageComponent,
    ItemListComponent,
    GeneralComponent,
    DelItemComponent,
    AddPhotoComponent,
  ]
})
export class GeneralModule { }
