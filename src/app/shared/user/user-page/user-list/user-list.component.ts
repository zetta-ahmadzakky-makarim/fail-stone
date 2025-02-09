import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { UserData } from '../../../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: UserData[] = [];
  getUserSubs: Subscription;
  filteredUsers = [];
  filteredUserName = '';

  constructor(private userService: UserService) {
    this.userService.fetchUsers();
  }

  ngOnInit(): void {
    this.getUserSubs = this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users
    });
  }

  filterTasks(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.filteredUserName.toLowerCase())
    );
  }

  ngOnDestroy(): void {
      this.getUserSubs.unsubscribe();
  }

}
