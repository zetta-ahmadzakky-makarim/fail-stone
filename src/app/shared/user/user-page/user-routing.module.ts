// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// *************** Application Modules & Component Imports ***************
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';


const userRoutes: Routes = [
  { path: '', component: UserListComponent },
  {
    path: ':id',
    component: UserDetailComponent,
    children: [
      {
        path: 'edit',
        component: UserFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
