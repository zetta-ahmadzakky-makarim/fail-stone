import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserData } from '../../../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: UserData;
  userId: number;
  originalUser: any;
  paramsSubscription: Subscription;
  userSubscription: Subscription;
  editingUserSubscription: Subscription;
  showForm: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];

      this.userService.getUser(this.userId).subscribe((user) => {
        this.user = { 
          ...user, 
          address: Array.isArray(user.address) ? user.address : [user.address] 
        };
      });
    });
    console.log(this.user);
  }

  loadUserData(): void {
    this.userService.getUser(this.userId).subscribe((user) => {
      this.user = { 
        ...user, 
        address: Array.isArray(user.address) ? user.address : [user.address] 
      };
      this.originalUser = { ...this.user };
    });
  }

  onEdit(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.router.navigate(['edit'], {
        relativeTo: this.route,
        queryParams: { editMode: 'true' },
        queryParamsHandling: 'merge',
      });
  
      this.originalUser = { ...this.user };
  
      this.editingUserSubscription = this.userService.editingUser$.subscribe(
        (updatedUser) => {
          if (updatedUser && updatedUser.id === this.userId) {
            this.user = { ...updatedUser };
          }
        }
      );
    } else {
      this.user = { ...this.originalUser };
  
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
      });
  
      if (this.editingUserSubscription) {
        this.editingUserSubscription.unsubscribe();
      }
  
      this.userService.setEditingUser(null); // Reset editingUser$
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    if (this.editingUserSubscription) {
      this.editingUserSubscription.unsubscribe();
    }
  }
}
