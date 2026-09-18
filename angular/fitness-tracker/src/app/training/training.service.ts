import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as uiActions from '../constants/ui-actions';
import * as trainingActions from '../constants/training-actions';
import * as fromTraining from '../reducers/training.reducer';

@Injectable()
export class TrainingService {
  private dbSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new uiActions.StartLoading());
    this.dbSubscriptions.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                id: doc.payload.doc.id,
                ...(doc.payload.doc.data() as Exercise),
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new uiActions.StopLoading());
            this.store.dispatch(
              new trainingActions.SetAvailableExercises(exercises)
            );
          },
          (error) => {
            this.store.dispatch(new uiActions.StopLoading());
            this.uiService.showSnackbar(
              'Fetching exercises failed, please try again later',
              null,
              3000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new trainingActions.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.addDataToDatabase({
          ...exercise,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    const progressMultiplier = progress / 100;
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        this.addDataToDatabase({
          ...exercise,
          duration: exercise.duration * progressMultiplier,
          calories: exercise.calories * progressMultiplier,
          date: new Date(),
          state: 'canceled',
        });
        this.store.dispatch(new trainingActions.StopTraining());
      });
  }

  fetchCompletedOrCanceledExercises() {
    this.dbSubscriptions.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(
            new trainingActions.SetFinishedExercises(exercises)
          );
        })
    );
  }

  cancelSubscriptions() {
    this.dbSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
