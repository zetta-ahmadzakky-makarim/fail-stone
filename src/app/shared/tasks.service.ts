export class TasksService {
  // private tasks = [
  //   {
  //     id: 1,
  //     title: 'Jogging',
  //     description: 'Morning jogging min. 5KM.',
  //     isCompleted: false,
  //     penaltyPoints: 20,
  //     creationDate: new Date('2025-02-01'),
  //     equipment: ['running shoes', 'smartwatch']
  //   },
  //   {
  //     id: 2,
  //     title: 'Tidy Up Room',
  //     description: 'Clean and reorganize room.',
  //     isCompleted: false,
  //     penaltyPoints: 20,
  //     creationDate: new Date('2025-02-01'),
  //     equipment: ['vacuum cleaner', 'dusting spray']
  //   },
  //   {
  //     id: 3,
  //     title: 'Jogging',
  //     description: 'Morning Jogging Min. 5KM.',
  //     isCompleted: false,
  //     penaltyPoints: 20,
  //     creationDate: new Date('2025-02-02'),
  //     equipment: ['running shoes', 'smartwatch']
  //   },
  //   {
  //     id: 4,
  //     title: 'Jogging',
  //     description: 'Morning Jogging Min. 5KM.',
  //     isCompleted: false,
  //     penaltyPoints: 20,
  //     creationDate: new Date('2025-02-03'),
  //     equipment: ['running shoes', 'smartwatch']
  //   },
  //   {
  //     id: 5,
  //     title: 'Cook Dinner',
  //     description: 'Cook some healthy meals.',
  //     isCompleted: false,
  //     penaltyPoints: 10,
  //     creationDate: new Date('2025-02-03'),
  //     equipment: ['cooking pot', 'spatula']
  //   },
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

  getTasks() {
    return this.tasks;
  }

  getTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  addTask(newTask: {
    title: string;
    description: string;
    penaltyPoints: number;
    equipment: any;
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

  getTotalPenaltyPoints(): number{
    return this.tasks
      .filter((task) => !task.isCompleted)
      .reduce((total, task) => total + task.penaltyPoints, 0);
  }

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

  updateTask(id: number, taskInfo: {title: string, description: string, isCompleted: boolean, penaltyPoints: number, equipment: any}): void{
    const task = this.tasks.find((t) =>  {return t.id === id});
    if (task) {
      task.title = taskInfo.title;
      task.description = taskInfo.description;
      task.isCompleted = taskInfo.isCompleted;
      task.penaltyPoints = taskInfo.penaltyPoints;
      task.equipment = taskInfo.equipment;
    }
  }
}
