// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *************** Application Modules & Component Imports ***************
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./shared/user/home/home.module').then(m => m.HomeModule) },
  { path: 'users', loadChildren: () => import('./shared/user/user-page/user.module').then(m => m.UserModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
