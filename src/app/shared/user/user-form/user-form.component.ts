import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserData } from '../../user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  editMode: boolean = false;
  userId: number;
  valueChangeSubs: Subscription;
  queryParamsSubs: Subscription;
  paramsSubs: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.userQueryParamsSubs();
    this.userParamsSubs();
    this.formValueChanges();
  }

  private initUserForm(): void{
    this.userForm = new FormGroup({
      'id': new FormControl<number>(null),
      'name': new FormControl<string>(null, [Validators.required, Validators.maxLength(50)]),
      'username': new FormControl<string>(null, [Validators.required, Validators.maxLength(20)]),
      'email': new FormControl<string>(null, [Validators.required, Validators.email]),
      'phone': new FormControl<String>(null, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(9), Validators.maxLength(15)]),
      'website': new FormControl<string>(null, [Validators.required, Validators.maxLength(50)]),
      'address': new FormArray([]),
    });
  }

  private formValueChanges() {
    this.valueChangeSubs = this.userForm.valueChanges.subscribe((updatedUser) => {
      if (this.editMode) {
        const { id, ...userData } = updatedUser;
        this.userService.setEditingUser({ id: this.userId, ...userData });
      }
    });
  }

  private userQueryParamsSubs(): void{
    this.queryParamsSubs = this.route.queryParams.subscribe((queryParams) => {
      this.editMode = queryParams['editMode'] === 'true';
    });
  }

  private userParamsSubs(): void {
    this.paramsSubs = this.route.parent.params.subscribe((param: Params) => {
      if (param['id']) {
        this.userId = +param['id'];
        this.userService.getUser(this.userId).subscribe((user) => {
          if (user) {
            this.userForm.patchValue({
              'id': user.id,
              'name': user.name,
              'username': user.username,
              'email': user.email,
              'phone': user.phone,
              'website': user.website,
            });

            const addressArray = this.userForm.get('address') as FormArray;
            addressArray.clear();
            user.address.forEach((address) => {
              addressArray.push(
                new FormGroup({
                  street: new FormControl<string>(address.street, Validators.required),
                  suite: new FormControl<string>(address.suite, Validators.required),
                  city: new FormControl<string>(address.city, Validators.required),
                })
              );
            });
          }
        });
      }

      if (!this.editMode) {
        (this.userForm.get('address') as FormArray).push(
          new FormGroup({
            street: new FormControl<string>(null, Validators.required),
            suite: new FormControl<string>(null, Validators.required),
            city: new FormControl<string>(null, Validators.required),
          })
        );
      }
    });
  }

  onAddAddress(): void{
    const addressArray = this.userForm.get('address') as FormArray;
    console.log('ini equipmentArray', addressArray)
    addressArray.push(new FormGroup({
      'street': new FormControl<string>(null, Validators.required),
      'suite': new FormControl<string>(null, Validators.required),
      'city': new FormControl<string>(null, Validators.required),
    }));
  }

  onRemoveAddress(addressIndex: number): void{
    const addressArray = this.userForm.get('address') as FormArray;
    if (addressArray.length > 0) {
      addressArray.removeAt(addressIndex);
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.onUpdateUser();
    } else {
      if (this.userForm.valid) {
        this.onAddUser();
        console.log(this.userForm.value);
        
      } else {
        alert('Please fill all fields with valid data!');
        console.log(this.userService.users$);
      }
    }
  }

  private onAddUser(): void {
    this.userService.addUser(this.userForm.value).subscribe((response: UserData) => {
      this.userService.getUsers().pipe(take(1)).subscribe((users) => {
        users.push(this.userForm.value)
        this.userService.usersSubject.next(users)
      })
      
      console.log('User added:', response);
      alert('User has been successfully added!');
      this.userForm.reset();
      (this.userForm.get('address') as FormArray).clear();
    });
  }

  private onUpdateUser(): void {
    this.userService.updateUser(this.userId, this.userForm.value).subscribe((response) => {
      console.log('User updated:', response);
      alert('User has been updated!');
    });
  }

  get controls() {
    return (this.userForm.get('address') as FormArray).controls;
  }


  validateNumberInput(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  preventPasteText(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
  
    if (!/^\d+$/.test(pastedText)) {
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    this.valueChangeSubs.unsubscribe();
    this.queryParamsSubs.unsubscribe();
    this.paramsSubs.unsubscribe();
  }

}
