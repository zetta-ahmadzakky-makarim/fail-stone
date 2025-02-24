// *************** Angular Imports ***************
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// *************** Application Services Imports ***************
import { TasksService } from '../../tasks.service';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  // *************** Decorator Variables ***************
  @Input() task: { id: number, title: string, description: string, isCompleted: boolean, penaltyPoints: number, creationDate: Date, equipment: {name: string, quantity: number}[] };

  constructor(private taskService: TasksService, private route: ActivatedRoute, private router: Router) { }

  /**
   * Toggles the completion status of the task.
   * - Updates the task's `isCompleted` status.
   * - Displays an alert message indicating whether the task is completed or not.
   */
  onUpdateIsCompleted(): void{
    this.taskService.updateIsCompleted(this.task.id, { isCompleted: !this.task.isCompleted });
    let message = ''
    if (this.task.isCompleted) {
      message = ' is done'
    } else {
      message = ' is not done'
    }
    alert(this.task.title + message)
  }
}
