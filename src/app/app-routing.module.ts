// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *************** Application Modules & Component Imports ***************
import { PenaltyTrackerComponent } from './shared/penalty/penalty-tracker/penalty-tracker.component';
import { TaskListComponent } from './shared/task/task-list/task-list.component';
import { TaskDetailComponent } from './shared/task/task-detail/task-detail.component';
import { TaskFormComponent } from './shared/task/task-form/task-form.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { UserListComponent } from './shared/user/user-list/user-list.component';
import { UserDetailComponent } from './shared/user/user-detail/user-detail.component';
import { UserFormComponent } from './shared/user/user-form/user-form.component';

const appRoutes: Routes = [
  // { path: '', component: PenaltyTrackerComponent },
  // { path: 'users', component: TaskListComponent },
  // {
  //   path: 'users/:id',
  //   component: TaskDetailComponent,
  //   children: [
  //     {
  //       path: 'edit',
  //       component: TaskFormComponent,
  //     },
  //   ],
  // },
  // { path: '**', component: PageNotFoundComponent },
  { path: '', component: PenaltyTrackerComponent },
  { path: 'users', component: UserListComponent },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    children: [
      {
        path: 'edit',
        component: UserFormComponent,
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
