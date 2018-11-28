import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {AuthorizationComponent} from '../user/authorization/authorization.component';
import {RegistrationComponent} from '../user/registration/registration.component';
import {AuthRegGuard} from '../Guards/auth-reg.guard';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'authorization',
    canActivate: [AuthRegGuard],
    component: AuthorizationComponent
  },
  {
    path: 'registration',
    canActivate: [AuthRegGuard],
    component: RegistrationComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
