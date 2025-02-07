import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = [];
  getUserSubs: Subscription;

  constructor(private userService: UserService) {
    const allUser = this.userService.fetchUsers();
  }

  ngOnInit(): void {
    this.getUserSubs = this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
      this.getUserSubs.unsubscribe();
      this.userService.usersSubs.unsubscribe();
  }

}
