// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *************** Application Modules & Component Imports ***************
import { PenaltyTrackerComponent } from './shared/penalty/penalty-tracker/penalty-tracker.component';
import { TaskListComponent } from './shared/task/task-list/task-list.component';
import { TaskDetailComponent } from './shared/task/task-detail/task-detail.component';
import { TaskFormComponent } from './shared/task/task-form/task-form.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: PenaltyTrackerComponent },
  { path: 'tasks', component: TaskListComponent },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    children: [
      {
        path: 'edit',
        component: TaskFormComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
