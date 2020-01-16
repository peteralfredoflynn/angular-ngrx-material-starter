import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  actionPlayerBarGroupList,
  actionPlayerBarGroupListSuccess,
  actionPlayerBarGroupListError
} from './soccer.actions';
import { SoccerService } from './soccer.service';

@Injectable()
export class SoccerEffects {
  constructor(private actions$: Actions, private service: SoccerService) {}

  getPlayerBarGroup = createEffect(() =>
    this.actions$.pipe(
      ofType(actionPlayerBarGroupList),
      switchMap(action =>
        this.service.getPlayerBarGroups().pipe(
          map(response =>
            actionPlayerBarGroupListSuccess({ playerBarGroups: response })
          ),
          catchError(error => of(actionPlayerBarGroupListError({ error })))
        )
      )
    )
  );
}
