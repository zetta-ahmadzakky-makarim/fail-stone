import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  editMode: boolean = false;
  taskId: number;
  queryParamsSubs: Subscription;
  paramsSubs: Subscription;

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initTaskForm();
    this.taskQueryParamsSubs();
    this.taskParamsSubs();
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
              'title': task.title,
              'description': task.description,
              'isCompleted': task.isCompleted,
              'penaltyPoints': task.penaltyPoints,
          });
          if (task.equipment) {
            const equipmentArray = this.taskForm.get(
              'equipment'
            ) as FormArray;
            task.equipment.forEach((equipment: any) => {
              // equipmentArray.push(new FormControl<any>(equipment));
              equipmentArray.push(new FormGroup({
                'name': new FormControl<string>(equipment.name),
                'quantity': new FormControl<number>(equipment.quantity),
              }));
            });
          }
        }
      }
    });
  }

  private initTaskForm(): void{
    this.taskForm = new FormGroup({
      'title': new FormControl<string>('', Validators.required),
      'description': new FormControl<string>('', Validators.required),
      'isCompleted': new FormControl<boolean>(false, Validators.required),
      'penaltyPoints': new FormControl<number>(null, Validators.required),
      'equipment': new FormArray([]),
    });
  }

  onAddEquipment(): void{
    const equipmentArray = this.taskForm.get('equipment') as FormArray;
    console.log('ini equipmentArray', equipmentArray)
    equipmentArray.push(new FormGroup({
      'name': new FormControl<string>('', Validators.required),
      'quantity': new FormControl<number>(null, [Validators.required, Validators.min(1)]),
    }));

  }

  onSubmit(): void{
    if (this.editMode) {
      this.onTaskUpdated()
    } else {
      this.onTaskAdded()
    }
  }

  private onTaskUpdated(): void{
    this.taskService.updateTask(this.taskId, this.taskForm.value);
  }

  private onTaskAdded(): void{
    this.taskService.addTask(this.taskForm.value);
    console.log(this.taskForm.value);
    this.taskForm.reset();
    const equipmentArray = this.taskForm.get('equipment') as FormArray;
    equipmentArray.clear();
  }

  get controls() {
    return (this.taskForm.get('equipment') as FormArray).controls;
  }

  ngOnDestroy(): void {
    this.queryParamsSubs.unsubscribe();
    this.paramsSubs.unsubscribe();
  }
}
