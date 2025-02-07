import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserData } from '../../user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: any;
  userId: number;
  paramsSubscription: Subscription;
  editingUserSubscription: Subscription;
  showForm: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.userId = +this.route.snapshot.params['id'];
      this.user = this.userService.getUser(this.userId);
    });
    console.log(this.user);
    
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    if (this.editingUserSubscription) {
      this.editingUserSubscription.unsubscribe();
    }
  }

  onEdit(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.router.navigate(['edit'], {
        relativeTo: this.route,
        queryParams: { editMode: 'true' },
        queryParamsHandling: 'merge',
      });

      // this.editingUserSubscription = this.userService.editingUser$.subscribe(
      //   (updatedUser) => {
      //     if (updatedUser && updatedUser.id === this.userId) {
      //       this.user = updatedUser;
      //     }
      //   }
      // );
    } else {
      this.user = this.userService.getUser(this.userId);
      this.router.navigate(['.'], { relativeTo: this.route, queryParamsHandling: 'merge' });

      if (this.editingUserSubscription) {
        this.editingUserSubscription.unsubscribe();
      }
    }
  }
}
