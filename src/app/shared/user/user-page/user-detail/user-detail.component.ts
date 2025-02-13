// *************** Angular Imports ***************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// *************** Third-Party Library Imports ***************
import { Subscription } from 'rxjs';

// *************** Application Services Imports ***************
import { UserService } from '../../../user.service';

// *************** Application Models and Settings Imports ***************
import { UserData } from '../../../user.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  // *************** State Variables ***************
  user: UserData;
  userId: number;
  originalUser: any;
  showForm: boolean = false;

  // *************** Private Variables ***************
  private subs = new SubSink();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // *************** getUser Data Based On Subscribed Params
    this.subs.sink = this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];
      this.loadUserData()
    });
  }

  // *************** Funtion For getUser Data
  loadUserData(): void {
    this.subs.sink = this.userService.getUser(this.userId).subscribe((user) => {
      this.user = { 
        ...user, 
        address: Array.isArray(user.address) ? user.address : [user.address] 
      };
      this.originalUser = { ...this.user };
    });
  }

  // *************** Function For Displaying And Removing Form Then Subscribe To EditingUser So That Data In Detail Card Reactive
  onEdit(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.router.navigate(['edit'], {
        relativeTo: this.route,
        queryParams: { editMode: 'true' },
        queryParamsHandling: 'merge',
      });

      this.originalUser = { ...this.user };

      this.subs.sink = this.userService.editingUser$.subscribe(
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

      this.userService.setEditingUser(null);
    }
  }

  ngOnDestroy(): void {
    this.subs.sink
  }
}
