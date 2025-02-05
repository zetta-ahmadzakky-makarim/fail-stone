import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-penalty-tracker',
  templateUrl: './penalty-tracker.component.html',
  styleUrls: ['./penalty-tracker.component.css']
})
export class PenaltyTrackerComponent implements OnInit {
  totalPenaltyPoints: number = 0;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void{
    this.totalPenaltyPoints = this.taskService.getTotalPenaltyPoints();
  }
}
