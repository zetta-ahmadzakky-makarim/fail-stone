// *************** Angular Imports ***************
import { Component, OnInit, OnDestroy } from '@angular/core';

// *************** Application Models and Services Imports ***************
import { UserData } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  // *************** State Variables ***************
  users: UserData[] = [];
  totalUsers: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.totalUsers = this.userService.getTotalUsers();
  }

  ngOnDestroy(): void {}
}
