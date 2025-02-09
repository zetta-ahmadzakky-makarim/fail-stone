// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *************** Application Modules & Component Imports ***************
import { HomePageComponent } from './home-page/home-page.component';


const homeRoutes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
