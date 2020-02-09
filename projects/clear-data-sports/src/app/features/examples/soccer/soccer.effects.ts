import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  actionPlayerBarGroupList,
  actionPlayerBarGroupListSuccess,
  actionPlayerBarGroupListError,
  actionPlayerList,
  actionPlayerListSuccess,
  actionPlayerListError,
  actionPlayerBarList,
  actionPlayerBarListSuccess,
  actionPlayerBarListError
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
            actionPlayerBarGroupListSuccess({
              playerBarGroups: response['results']
            })
          ),
          catchError(error => of(actionPlayerBarGroupListError({ error })))
        )
      )
    )
  );

  getPlayers = createEffect(() =>
    this.actions$.pipe(
      ofType(actionPlayerList),
      switchMap(action =>
        this.service.getPlayers(action.name).pipe(
          map(response => {
            return actionPlayerListSuccess({ playerList: response['results'] });
          }),
          catchError(error => of(actionPlayerListError({ error })))
        )
      )
    )
  );

  getPlayerBars = createEffect(() =>
    this.actions$.pipe(
      ofType(actionPlayerBarList),
      switchMap(action =>
        this.service.getPlayerBars(action.player_id, action.group_id).pipe(
          map(response => {
            return actionPlayerBarListSuccess({
              playerBarList: response['results']
            });
          }),
          catchError(error => of(actionPlayerBarListError({ error })))
        )
      )
    )
  );
}
