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
  tasks: { id: number, title: string, description: string, isCompleted: boolean, penaltyPoints: number, creationDate: Date}[] = [];
  filteredTasks = [];
  filteredTaskName = '';

  constructor(private taskService: TasksService) {}

  ngOnInit(): void{
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
  }

  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.filteredTaskName.toLowerCase())
    );
  }
}
