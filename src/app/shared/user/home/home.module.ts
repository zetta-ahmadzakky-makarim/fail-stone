// *************** Angular Imports ***************
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// *************** Application Modules & Component Imports ***************
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule,
    SharedModule
  ]
})
export class HomeModule { }
