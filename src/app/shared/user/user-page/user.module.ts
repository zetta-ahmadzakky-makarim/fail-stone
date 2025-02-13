// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// *************** Third-Party Library Imports ***************
import { TranslateModule } from '@ngx-translate/core';

// *************** Application Modules & Component Imports ***************
import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared.module';

// *************** Utilities and Pipes Imports ***************
import { FilterUserNamePipe } from './filter-user-name.pipe';

@NgModule({
  declarations: [
    UserListComponent,
    UserCardComponent,
    UserFormComponent,
    UserDetailComponent,
    FilterUserNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    UserRoutingModule,
    SharedModule
  ],
})
export class UserModule {}
