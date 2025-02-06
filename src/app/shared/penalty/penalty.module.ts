// *************** Angular Imports ***************
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// *************** Application Modules & Component Imports ***************
import { PenaltyTrackerComponent } from './penalty-tracker/penalty-tracker.component';


@NgModule({
  declarations: [
    PenaltyTrackerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PenaltyModule { }
