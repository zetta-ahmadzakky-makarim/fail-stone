// *************** Angular Imports ***************
import { Component, OnInit } from '@angular/core';

// *************** Application Services Imports ***************
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  // *************** Misc Variables ***************
  tasks: { id: number, title: string, description: string, isCompleted: boolean, penaltyPoints: number, creationDate: Date}[] = [];
  filteredTasks = [];
  filteredTaskName = '';

  constructor(private taskService: TasksService) {}

  /**
   * Initializes the component by retrieving tasks and setting up the filtered tasks list.
   */
  ngOnInit(): void{
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
  }

  /**
   * Filters tasks based on the entered task name.
   */
  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.filteredTaskName.toLowerCase())
    );
  }
}
