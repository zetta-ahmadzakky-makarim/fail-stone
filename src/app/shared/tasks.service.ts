// *************** Angular Imports ***************
import { Injectable } from '@angular/core';

// *************** Third-Party Library Imports ***************
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  // *************** Private Variables ***************
  private tasks = [
    {
      id: 1,
      title: 'Jogging',
      description: 'Morning jogging min. 5KM.',
      isCompleted: false,
      penaltyPoints: 20,
      creationDate: new Date('2025-02-01'),
      equipment: [
        { name: 'Running Shoes', quantity: 1 },
        { name: 'Smartwatch', quantity: 1 }
      ]
    },
    {
      id: 2,
      title: 'Tidy Up Room',
      description: 'Clean and reorganize room.',
      isCompleted: false,
      penaltyPoints: 20,
      creationDate: new Date('2025-02-01'),
      equipment: [
        { name: 'vacuum cleaner', quantity: 1 },
        { name: 'dusting spray', quantity: 1 }
      ]
    },
    {
      id: 3,
      title: 'Jogging',
      description: 'Morning Jogging Min. 5KM.',
      isCompleted: false,
      penaltyPoints: 20,
      creationDate: new Date('2025-02-02'),
      equipment: [
        { name: 'Running Shoes', quantity: 1 },
        { name: 'Smartwatch', quantity: 1 }
      ]
    },
    {
      id: 4,
      title: 'Jogging',
      description: 'Morning Jogging Min. 5KM.',
      isCompleted: false,
      penaltyPoints: 20,
      creationDate: new Date('2025-02-03'),
      equipment: [
        { name: 'Running Shoes', quantity: 1 },
        { name: 'Smartwatch', quantity: 1 }
      ]
    },
    {
      id: 5,
      title: 'Cook Dinner',
      description: 'Cook some healthy meals.',
      isCompleted: false,
      penaltyPoints: 10,
      creationDate: new Date('2025-02-03'),
      equipment: [
        { name: 'cooking pot', quantity: 4 },
        { name: 'spatula', quantity: 1 }
      ]
    },
  ];

  // *************** State Variables ***************
  filteredTaskName = '';

  // *************** Private Variables ***************
  private editingTaskSubject = new BehaviorSubject<any>(null);
  editingTask$ = this.editingTaskSubject.asObservable();

  // *************** Function For Get All Tasks
  getTasks() {
    return this.tasks;
  }

  // *************** Function For Get A Certain Task
  getTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  // *************** Function For Setting EditingTask
  setEditingTask(task: {id: number, title: string, description: string, isCompleted: boolean, penaltyPoints: number, creationDate: Date, equipment: {name: string, quantity: number}[]}) {
    this.editingTaskSubject.next(task);
  }

  // *************** Function For Resetting EditingTask
  resetEditingTask(): void {
    this.editingTaskSubject.next(null);
  }

  // *************** Function For Adding New Task With ID That More Than The Highest ID
  addTask(newTask: {
    title: string;
    description: string;
    penaltyPoints: number;
    equipment: {name: string, quantity: number}[];
  }): void{
    const newId = this.tasks.length
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;

    const task = {
      ...newTask,
      id: newId,
      isCompleted: false,
      creationDate: new Date(),
    };

    console.log('New Task Added:', task);
    this.tasks.push(task);
  }

  // *************** Function For Get Total Penalty Points Of Uncompleted Tasks
  getTotalPenaltyPoints(): number{
    return this.tasks
      .filter((task) => !task.isCompleted)
      .reduce((total, task) => total + task.penaltyPoints, 0);
  }

  // *************** Function For Get Total Uncompleted Tasks
  getTotalUncompletedTasks() {
    return this.tasks.filter((task) => !task.isCompleted).length;
  }

  // *************** Function For Set Completion Of A Task
  updateIsCompleted(id: number, taskInfo: {isCompleted: boolean}): void{
    const task = this.tasks.find(
      (t) => {
        return t.id === id;
      }
    );
    if (task) {
      task.isCompleted = taskInfo.isCompleted;
    }
  }

  // *************** Function For Updating Task Data
  updateTask(id: number, taskInfo: {id: number, title: string, description: string, isCompleted: boolean, penaltyPoints: number, creationDate: Date, equipment: {name: string, quantity: number}[]}): void{
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = taskInfo;
    }
  }
}
