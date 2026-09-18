import { Component, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TrainingService } from './training.service';
import * as fromTraining from '../reducers/training.reducer';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  standalone: true,
  imports: [
    NgIf,
    MatTabsModule,
    NewTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
    AsyncPipe,
  ],
})
export class TrainingComponent implements OnInit {
  currentTraining$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
  ) {}

  ngOnInit() {
    this.currentTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
