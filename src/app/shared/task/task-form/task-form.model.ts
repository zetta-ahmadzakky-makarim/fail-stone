import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
export interface TaskFormGroup {
  title: FormControl<string>;
  description: FormControl<string>;
  isCompleted: FormControl<boolean>;
  penaltyPoints: FormControl<number>;
  equipment: FormArray<FormControl<string>>;
}
export interface TaskFormValue {title: string, description: string, isCompleted: boolean, penaltyPoints: number, equipment: string[]}