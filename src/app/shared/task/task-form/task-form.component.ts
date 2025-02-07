// *************** Angular Imports ***************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

// *************** Third-Party Library Imports ***************
import { Subscription } from 'rxjs';

// *************** Application Services Imports ***************
import { TasksService } from '../../tasks.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  editMode: boolean = false;
  taskId: number;
  valueChangeSubs: Subscription;
  queryParamsSubs: Subscription;
  paramsSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initTaskForm();
    this.taskQueryParamsSubs();
    this.taskParamsSubs();
    this.formValueChanges();
  }

  private initTaskForm(): void{
    this.taskForm = new FormGroup({
      'id': new FormControl<number>(null),
      'title': new FormControl<string>(null, [Validators.required, Validators.maxLength(20)]),
      'description': new FormControl<string>(null, [Validators.required, Validators.maxLength(500)]),
      'isCompleted': new FormControl<boolean>(false, Validators.required),
      'penaltyPoints': new FormControl<number>(null, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(10), Validators.max(100)]),
      'creationDate': new FormControl<Date>(null),
      'equipment': new FormArray([]),
    });
  }

  private formValueChanges() {
    this.valueChangeSubs = this.taskForm.valueChanges.subscribe((updatedTask) => {
      if (this.editMode) {
        const { creationDate, ...taskData } = updatedTask;
        this.taskService.setEditingTask({ id: this.taskId, creationDate: this.taskService.getTask(this.taskId)?.creationDate, ...taskData });
      }
    });
  }

  private taskQueryParamsSubs(): void{
    this.queryParamsSubs = this.route.queryParams.subscribe((queryParams) => {
      this.editMode = queryParams['editMode'] === 'true';
    });
  }

  private taskParamsSubs(): void{
    this.paramsSubs = this.route.parent.params.subscribe((param: Params) => {
      if (param['id']) {
        this.taskId = +param['id'];
        const task = this.taskService.getTask(this.taskId);

        if (task) {
          this.taskForm.patchValue({
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'isCompleted': task.isCompleted,
            'penaltyPoints': task.penaltyPoints,
            'creationDate': task.creationDate,
          });
          const equipmentArray = this.taskForm.get('equipment') as FormArray;
          equipmentArray.clear();
          task.equipment.forEach((equipment: { name: string; quantity: number }) => {
            equipmentArray.push(new FormGroup({
              'name': new FormControl<string>(equipment.name),
              'quantity': new FormControl<number>(equipment.quantity),
            }));
          });
        }
      }
      if (!this.editMode) {
        (this.taskForm.get('equipment') as FormArray).push(new FormGroup({
          'name': new FormControl<string>(null, [Validators.required, Validators.maxLength(20)]),
          'quantity': new FormControl<number>(null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]),
        }));
      }
    });
  }

  onAddEquipment(): void{
    const equipmentArray = this.taskForm.get('equipment') as FormArray;
    console.log('ini equipmentArray', equipmentArray)
    equipmentArray.push(new FormGroup({
      'name': new FormControl<string>(null, [Validators.required, Validators.maxLength(20)]),
      'quantity': new FormControl<number>(null, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]),
    }));
  }

  onRemoveEquipment(equipmentIndex: number): void{
    const equipmentArray = this.taskForm.get('equipment') as FormArray;
    if (equipmentArray.length > 0) {
      equipmentArray.removeAt(equipmentIndex);
    }
  }

  onSubmit(): void{
    if (this.editMode) {
      this.onTaskUpdated()
    } else {
      if (this.taskForm.valid) {
        this.onTaskAdded()
      } else {
        alert('Please fill all field with valid data!')
      }
    }
  }

  private onTaskUpdated(): void{
    this.taskService.updateTask(this.taskId, this.taskForm.value);
    console.log(this.taskForm.value);
    alert('Task ' + this.taskForm.value.title + ' has been updated')
  }

  private onTaskAdded(): void{
    const newTask = this.taskForm.value;
    this.taskService.addTask(this.taskForm.value);
    console.log(newTask);
    this.taskForm.reset();
    (this.taskForm.get('equipment') as FormArray).clear();
    alert('Task ' + newTask.title + ' has been successfully added')
  }

  get controls() {
    return (this.taskForm.get('equipment') as FormArray).controls;
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