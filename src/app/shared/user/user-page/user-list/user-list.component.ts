import { Component, OnDestroy, OnInit } from '@angular/core';

// *************** Application Services Imports ***************
import { UserService } from '../../../user.service';

// *************** Third-Party Library Imports ***************
import { Subscription } from 'rxjs';

// *************** Application Models and Settings Imports ***************
import { UserData } from '../../../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  // *************** State Variables ***************
  users: UserData[] = [];
  filteredUsers: UserData[] = [];
  filteredUserName: string = '';

  // *************** Private Variables ***************
  private getUserSubs: Subscription;

  constructor(private userService: UserService) {
    this.userService.fetchUsers();
  }

  ngOnInit(): void {
    this.getUsers()
  }

  // *************** Function For Get All User Data
  getUsers(): void {
    this.getUserSubs = this.userService.getUsers().subscribe((users: UserData[]) => {
      this.users = users;
      this.filteredUsers = [...this.users];
    });
  }

  // *************** Function For Get Filtered User Data
  filterTasks(): void {
    this.filteredUsers = this.users.filter((user: UserData) =>
      user.name.toLowerCase().includes(this.filteredUserName.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.getUserSubs.unsubscribe();
  }
}
