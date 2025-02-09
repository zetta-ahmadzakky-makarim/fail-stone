import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  onDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: this.user.name +' will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.user.id);
        Swal.fire('Deleted!', this.user.name + ' has been deleted.', 'success')
      }
    })
  }

}
