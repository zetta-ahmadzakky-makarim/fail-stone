import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaskModule } from './task/task.module';
import { PenaltyModule } from './penalty/penalty.module';
import { TasksService } from './tasks.service';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    TaskModule,
    PenaltyModule
  ],
  providers: [TasksService]
})
export class SharedModule { }
