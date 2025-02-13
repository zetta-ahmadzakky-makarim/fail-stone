// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// *************** Application Modules & Component Imports ***************
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskFormComponent } from './task-form/task-form.component';

// *************** Utilities and Pipes Imports ***************
import { ShortenPipe } from '../shorten.pipe';
import { FilterTaskNamePipe } from './filter-task-name.pipe';

@NgModule({
  declarations: [
    TaskCardComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskFormComponent,
    ShortenPipe,
    FilterTaskNamePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TaskModule {}
