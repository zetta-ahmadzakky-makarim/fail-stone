// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

// *************** Application Services Imports ***************
import { TasksService } from './tasks.service';
import { UserService } from './user.service';

// *************** Application Modules & Component Imports ***************
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskModule } from './task/task.module';
import { PenaltyModule } from './penalty/penalty.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    TaskModule,
    PenaltyModule,
    UserModule,
    HttpClientModule
  ],
  providers: [TasksService, UserService]
})
export class SharedModule { }
