// *************** Angular Imports ***************
import { Component, OnInit } from '@angular/core';

// *************** Application Services Imports ***************
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    penaltyPoints: number;
    creationDate: Date;
  }[] = [];
  filteredTasks: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    penaltyPoints: number;
    creationDate: Date;
  }[] = [];
  filteredTaskName: string = '';

  constructor(
    private taskService: TasksService
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
  }

  // *************** Function For Filter Task Also Set Task Title And Text Inputted To Lower Case
  filterTasks(): void {
    this.filteredTasks = this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.filteredTaskName.toLowerCase())
    );
  }
}
