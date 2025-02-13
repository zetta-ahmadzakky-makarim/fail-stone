// *************** Angular Imports ***************
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// *************** Third-Party Library Imports ***************
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// *************** Application Modules & Component Imports ***************
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared.module';

// *************** Utilities and Pipes Imports ***************
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
