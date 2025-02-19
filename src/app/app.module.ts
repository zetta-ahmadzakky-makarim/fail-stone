// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// *************** Application Modules & Component Imports ***************
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
