// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// *************** Application Services Imports ***************
import { TasksService } from './tasks.service';

// *************** Application Modules & Component Imports ***************
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskModule } from './task/task.module';
import { PenaltyModule } from './penalty/penalty.module';


@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    TaskModule,
    PenaltyModule
  ],
  providers: [TasksService]
})
export class SharedModule { }
