import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  editMode: boolean = false;
  userId: number;
  valueChangeSubs: Subscription;
  queryParamsSubs: Subscription;
  paramsSubs: Subscription;
  isFormValid: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.userQueryParamsSubs();
    this.userParamsSubs();
    this.formValueChanges();
    this.trackFormStatus();
  }

  private initUserForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl<number>(null),
      name: new FormControl<string>(null, [
        Validators.required,
      ]),
      username: new FormControl<string>(null, [
        Validators.required,
      ]),
      email: new FormControl<string>(null, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl<String>(null, [
        Validators.required,
      ]),
      website: new FormControl<string>(null, [
        Validators.required,
      ]),
      address: new FormArray([]),
    });
  }

  private trackFormStatus() {
    this.userForm.statusChanges.subscribe((status) => {
      this.isFormValid = status === 'VALID';
    });
  }

  private formValueChanges() {
    this.valueChangeSubs = this.userForm.valueChanges.subscribe(
      (updatedUser) => {
        if (this.editMode) {
          const { id, ...userData } = updatedUser;
          this.userService.setEditingUser({ id: this.userId, ...userData });
        }
      }
    );

    this.userForm.get('name')?.valueChanges.subscribe((value) => {
      const sanitizedValue = this.sanitizeName(value);
      if (value !== sanitizedValue) {
        this.userForm.get('name')?.patchValue(sanitizedValue, { emitEvent: false });
      }
    });
  
    this.userForm.get('username')?.valueChanges.subscribe((value) => {
      const sanitizedValue = this.sanitizeUsername(value);
      if (value !== sanitizedValue) {
        this.userForm.get('username')?.patchValue(sanitizedValue, { emitEvent: false });
      }
    });
  }

  private sanitizeName(value: string): string {
    return value.replace(/[^a-zA-Z\s]/g, '');
  }
  
  private sanitizeUsername(value: string): string {
    return value.replace(/[^a-zA-Z0-9_]/g, '');
  }

  private userQueryParamsSubs(): void {
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
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              phone: user.phone,
              website: user.website,
            });

            const addressArray = this.userForm.get('address') as FormArray;
            addressArray.clear();

            console.log(user?.address);

            const addresses = Array.isArray(user.address)
              ? user.address
              : [user.address];

            addresses.forEach((address) => {
              addressArray.push(
                new FormGroup({
                  street: new FormControl<string>(
                    address.street,
                    Validators.required
                  ),
                  suite: new FormControl<string>(
                    address.suite,
                    Validators.required
                  ),
                  city: new FormControl<string>(
                    address.city,
                    Validators.required
                  ),
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

  onAddAddress(): void {
    const addressArray = this.userForm.get('address') as FormArray;
    console.log('ini equipmentArray', addressArray);
    addressArray.push(
      new FormGroup({
        street: new FormControl<string>(null, Validators.required),
        suite: new FormControl<string>(null, Validators.required),
        city: new FormControl<string>(null, Validators.required),
      })
    );
  }

  onRemoveAddress(addressIndex: number): void {
    const addressArray = this.userForm.get('address') as FormArray;
    if (addressArray.length > 0) {
      addressArray.removeAt(addressIndex);
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.onUpdateUser();
    } else {
      this.onAddUser();
    }
  }

  private onAddUser(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      console.log(this.userForm.value);
      Swal.fire({
        title: 'Success!',
        text: 'User ' + this.userForm.value.name + ' successfully added!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.userForm.reset();
      const addressArray = this.userForm.get('address') as FormArray;
      while (addressArray.length > 1) {
        addressArray.removeAt(0);
      }
      addressArray.at(0).reset();
    } else {
      Swal.fire({
        title: 'Form Invalid!',
        text: 'Please fill all fields with valid data!',
        icon: 'warning',
        confirmButtonText: 'CLOSE',
      });
    }
  }

  private onUpdateUser(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userId, this.userForm.value);
      console.log('User updated:', this.userForm.value);
      Swal.fire({
        title: 'Success!',
        text: this.userForm.value.name + ' data has been updated!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Form Invalid!',
        text: 'Please fill all fields with valid data!',
        icon: 'warning',
        confirmButtonText: 'CLOSE',
      });
    }
  }

  get controls() {
    return (this.userForm.get('address') as FormArray).controls;
  }

  ngOnDestroy(): void {
    this.valueChangeSubs.unsubscribe();
    this.queryParamsSubs.unsubscribe();
    this.paramsSubs.unsubscribe();
  }
}
