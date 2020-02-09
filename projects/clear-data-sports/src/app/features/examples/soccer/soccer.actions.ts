import { Player, PlayerBarGroup } from './soccer.model';
import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const actionPlayerBarGroupList = createAction('[PlayerBarGroup] List');

export const actionPlayerBarGroupListSuccess = createAction(
  '[PlayerBarGroup] List Success',
  props<{ playerBarGroups: any }>()
);

export const actionPlayerBarGroupListError = createAction(
  '[PlayerBarGroup] List Error',
  props<{ error: HttpErrorResponse }>()
);

export const actionPlayerList = createAction(
  '[Player] List',
  props<{ name: string }>()
);

export const actionPlayerListSuccess = createAction(
  '[Player] List Success',
  props<{ playerList: [Player] }>()
);

export const actionPlayerListError = createAction(
  '[Player] List Error',
  props<{ error: HttpErrorResponse }>()
);

export const actionPlayerBarList = createAction(
  '[PlayerBar] List',
  props<{ player_id?: number; group_id?: number }>()
);
export const actionPlayerBarListSuccess = createAction(
  '[PlayerBar] List Success',
  props<{ playerBarList: [] }>()
);
export const actionPlayerBarListError = createAction(
  '[PlayerBar] List Error',
  props<{ error: HttpErrorResponse }>()
);
