// *************** Angular Imports ***************
import { Component, Input, OnInit } from '@angular/core';

// *************** Third-Party Library Imports ***************
import Swal from 'sweetalert2';

// *************** Application Services Imports ***************
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  // *************** Decorator Variables ***************
  @Input() user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  // *************** Function For Deleting A User
  onDelete(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: this.user.name + ' will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.user.id);
        Swal.fire('Deleted!', this.user.name + ' has been deleted.', 'success');
      }
    });
  }
}
