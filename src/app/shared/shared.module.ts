// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";

// *************** Third-Party Library Imports ***************
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// *************** Application Services Imports ***************
import { TasksService } from './tasks.service';
import { UserService } from './user.service';

// *************** Application Modules & Component Imports ***************
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskModule } from './task/task.module';
import { PenaltyModule } from './penalty/penalty.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    TaskModule,
    PenaltyModule,
    TranslateModule
  ],
  exports: [TranslateModule],
  providers: [TasksService, UserService]
})
export class SharedModule { }