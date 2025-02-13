// *************** Angular Imports ***************
import { Component, Input } from '@angular/core';

// *************** Application Services Imports ***************
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  // *************** Decorator Variables
  @Input() task: { 
    id: number, 
    title: string, 
    description: string, 
    isCompleted: boolean, 
    penaltyPoints: number, 
    creationDate: Date, 
    equipment: { name: string, quantity: number }[] 
  };

  // *************** Private Variables
  constructor(private taskService: TasksService) { }

  // *************** Function For Completing Task and Displaying Alert
  onUpdateIsCompleted(): void {
    this.taskService.updateIsCompleted(this.task.id, { isCompleted: !this.task.isCompleted });
    let message = this.task.isCompleted ? ' is done' : ' is not done';
    alert(this.task.title + message);
  }
}
