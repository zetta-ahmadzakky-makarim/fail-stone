// *************** Angular Imports ***************
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// *************** Third-Party Library Imports ***************
import { Subscription } from 'rxjs';

// *************** Application Services Imports ***************
import { TasksService } from '../../tasks.service';
import { ShortenPipe } from '../shorten.pipe';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  providers: [ShortenPipe]
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  // *************** Private Variables ***************
  private subs: SubSink = new SubSink();

  // *************** State Variables ***************
  showForm: boolean = false;

  // *************** Misc Variables ***************
  task: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    penaltyPoints: number;
    creationDate: Date;
    equipment: { name: string; quantity: number; }[];
  };
  taskId: number;

  constructor(
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subs.sink = this.route.params.subscribe((params: Params) => {
      this.taskId = +this.route.snapshot.params['id'];
      this.task = this.taskService.getTask(this.taskId);
    });
    console.log(this.task);
    
  }

  onEdit(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.router.navigate(['edit'], {
        relativeTo: this.route,
        queryParams: { editMode: 'true' },
        queryParamsHandling: 'merge',
      });

      this.subs.sink = this.taskService.editingTask$.subscribe(
        (updatedTask) => {
          if (updatedTask && updatedTask.id === this.taskId) {
            this.task = updatedTask;
          }
        }
      );
    } else {
      this.task = this.taskService.getTask(this.taskId);
      this.router.navigate(['.'], { relativeTo: this.route, queryParamsHandling: 'merge' });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
