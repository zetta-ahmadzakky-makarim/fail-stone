import { RouterModule, Routes } from '@angular/router';
import { PenaltyTrackerComponent } from './shared/penalty/penalty-tracker/penalty-tracker.component';
import { TaskListComponent } from './shared/task/task-list/task-list.component';
import { TaskDetailComponent } from './shared/task/task-detail/task-detail.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { TaskFormComponent } from './shared/task/task-form/task-form.component';

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
