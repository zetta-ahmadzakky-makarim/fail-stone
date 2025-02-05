import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  task: {id: number, title: string, description: string, isCompleted: boolean, penaltyPoints: number, creationDate: Date}
  paramsSubcription: Subscription;

  constructor(private taskService: TasksService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void{
    const taskId = +this.route.snapshot.params['id'];
    this.task = this.taskService.getTask(taskId);

    this.paramsSubcription = this.route.params.subscribe(
      (params: Params) => {
        this.task = this.taskService.getTask(+params['id']);
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubcription.unsubscribe();
  }

  onEdit(): void{
    this.router.navigate(['edit'], { 
      relativeTo: this.route, 
      queryParams: { editMode: 'true' },
      queryParamsHandling: 'merge'
    });
  }
}
