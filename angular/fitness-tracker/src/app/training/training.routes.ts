import { Route } from '@angular/router';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { provideState } from '@ngrx/store';
import { trainingReducer } from '../reducers/training.reducer';

export const TRAINING_ROUTES: Route[] = [
  { 
    path: '',
    component: TrainingComponent,
    providers: [
      provideState('training', trainingReducer)
    ]
  },
  { path: 'currentTraining', component: CurrentTrainingComponent },
  { path: 'newTraining', component: NewTrainingComponent },
  { path: 'pastTrainings', component: PastTrainingsComponent },
];
